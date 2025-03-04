/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : views_functins.sql
Created By  : Bettina-Sarah Janesh et Vincent Fournier
About       : Ce fichier contient des définitions de vues et de fonctions SQL 
              utilisées pour gérer les données liées aux membres, suggestions, 
              notifications et messages dans une application de rencontre, y compris 
              des fonctions pour ajouter des photos et des activités aux membres, 
              calculer les distances entre les membres, gérer les correspondances et 
              les notifications de messages.
====================================================================================
------------------------------------------------------------------------------------
*/

DROP VIEW IF EXISTS member_photos_view;
DROP VIEW IF EXISTS member_activities_view;
DROP VIEW IF EXISTS chatroom_messages_view;

------- VIEWS 

CREATE VIEW member_photos_view AS
SELECT 
  m.id AS member_id, 
  m.first_name, 
  m.last_name, 
  p.id AS photo_id, 
  p.encryption_key, 
  p.position
FROM 
  member AS m
INNER JOIN member_photo AS mp ON m.id = mp.member_id
INNER JOIN photo AS p ON mp.photo_id = p.id;

CREATE VIEW member_activities_view AS
SELECT 
  m.id AS member_id, 
  m.first_name, 
  m.last_name,
  EXTRACT(YEAR FROM AGE(m.date_of_birth))::INT AS age,
  m.bio,
  m.religion,
  m.want_kids,
  m.city,
  m.relationship_type,
  ARRAY_AGG(a.activity_name) as activities,
  ARRAY_AGG(a.id) as activities_id
FROM 
  member AS m
LEFT JOIN member_activities AS ma ON m.id = ma.member_id
LEFT JOIN activity AS a ON ma.activity_id = a.id
GROUP BY m.id
ORDER BY m.id;

CREATE OR REPLACE VIEW chatroom_messages_view AS
SELECT
  mm.chatroom_name AS chatroom_name,
  msg.id AS message_id,
  msg.sender_id AS sender_id,
  sender.first_name AS sender_first_name,
  msg.msg AS message_content,
  msg.date_sent AS date_sent
from
  msg
JOIN
  member_match AS mm ON msg.match_id = mm.id
JOIN
  member AS sender ON msg.sender_id = sender.id
ORDER BY
  mm.chatroom_name, msg.date_sent;


------- FUNCTIONS

DROP FUNCTION IF EXISTS add_photos;
DROP FUNCTION IF EXISTS update_hobbies;

CREATE OR REPLACE FUNCTION add_photos
(user_id INTEGER, photo_keys VARCHAR(128)[])
RETURNS BOOLEAN
LANGUAGE PLPGSQL
AS $$
DECLARE
    photo_id INTEGER;
    key VARCHAR(128);
    position_counter INTEGER := 1;    -- Counter to track position in the array, starting at 1
BEGIN
  --delete all photos
-- !!! FOR NOW, we dont delete anymore since we submit 1 photo at a time. to be corrected!!
  -- DELETE from member_photo USING member 
  -- WHERE member_photo.member_id = member.id AND member.id = user_id;
  -- DELETE from photo WHERE photo.encryption_key = key;
  -- here we loop through the keys if multiple
  FOREACH key IN ARRAY photo_keys
  LOOP
    INSERT INTO photo (encryption_key, position) 
    VALUES (key, position_counter) 
    RETURNING id INTO photo_id;

    -- now we insert into member_photo table using member_id and photo_id
    INSERT INTO member_photo (member_id, photo_id)
    VALUES (user_id, photo_id);
    position_counter := position_counter + 1;
  END LOOP;
  
  RETURN TRUE;
END$$;


CREATE OR REPLACE FUNCTION update_hobbies
(user_id INTEGER, hobbies VARCHAR(128)[])
RETURNS BOOLEAN
LANGUAGE PLPGSQL
AS $$
DECLARE
    hobby_id INTEGER;
    hobby VARCHAR(128);
BEGIN
  --delete associated hobbies
  DELETE from member_activities USING member 
  WHERE member_activities.member_id = member.id AND member.id = user_id;
  FOREACH hobby IN ARRAY hobbies
  LOOP
  --return hobby id corresponding users hobbies (returning only works with INSERT, UPDATE, or DELETE)
  	SELECT id INTO hobby_id FROM activity WHERE activity_name = hobby;
    INSERT INTO member_activities (member_id, activity_id) 
    VALUES (user_id, hobby_id);
  END LOOP;
  RETURN TRUE;
END$$;

-- DISTANCE & LOCALISATION FUNCTIONS

DROP FUNCTION IF EXISTS calculate_distance;

CREATE OR REPLACE FUNCTION calculate_distance
(user1_lat DOUBLE PRECISION, user1_long DOUBLE PRECISION, user2_lat DOUBLE PRECISION,
 user2_long DOUBLE PRECISION)
RETURNS DOUBLE PRECISION
AS $$
DECLARE
  distance_km DOUBLE PRECISION;
BEGIN
-- 6371: radius Earth in km
    distance_km := 6371 * 2 * ASIN(
        SQRT(
            POWER( SIN( (RADIANS(user1_lat) - RADIANS(user2_lat) ) / 2), 2) + 
            COS(RADIANS(user1_lat)) * COS(RADIANS(user2_lat)) * 
            POWER(SIN( ( RADIANS(user1_long) - RADIANS(user2_long) ) / 2), 2)
        )
    );
	RETURN distance_km * 1000;
END;
$$ LANGUAGE PLPGSQL;


DROP FUNCTION IF EXISTS fetch_distance;
CREATE OR REPLACE FUNCTION fetch_distance(logged_id INT, suggestion_id INT)
RETURNS NUMERIC
AS $$
DECLARE
    lat1 DOUBLE PRECISION;
    long1 DOUBLE PRECISION;
    lat2 DOUBLE PRECISION;
    long2 DOUBLE PRECISION;
    distance DOUBLE PRECISION;
    second_user_id INT;
BEGIN
    SELECT last_lat, last_long
    INTO lat1, long1
    FROM member
    WHERE id = logged_id;
    
    SELECT member_id_2
    INTO second_user_id
    FROM suggestion
    WHERE id = suggestion_id AND member_id_1 = logged_id;
    IF second_user_id IS NULL THEN
        RETURN NULL;
    END IF;
    SELECT last_lat, last_long
    INTO lat2, long2
    FROM member
    WHERE id = second_user_id;
    IF lat1 IS NULL OR long1 IS NULL OR lat2 IS NULL OR long2 IS NULL THEN
        RETURN NULL;
    END IF;
    distance := calculate_distance(lat1, long1, lat2, long2); 
    RETURN ROUND((distance / 1000)::NUMERIC, 1); 
END;
$$ LANGUAGE plpgsql;



DROP FUNCTION IF EXISTS find_eligible_members_activities;

CREATE OR REPLACE FUNCTION find_eligible_members_activities
(user_id INTEGER)
RETURNS TABLE(member_id INT, aggregated_id_activities INT[])
AS $$
DECLARE
  user_last_lat FLOAT;
  user_last_long FLOAT;
BEGIN
  SELECT last_lat, last_long INTO user_last_lat, user_last_long
  FROM member
  WHERE id = user_id;

	RETURN QUERY
  WITH eligible_members AS (
    SELECT m.id
    FROM member m
    WHERE m.gender = ANY (
        SELECT UNNEST(preferred_genders)
        FROM member
        WHERE id = user_id
      )
      AND EXTRACT(YEAR FROM AGE(CURRENT_DATE, m.date_of_birth)) BETWEEN (
        SELECT min_age
        FROM member
        WHERE id = user_id
      )
      AND (
        SELECT max_age
        FROM member
        WHERE id = user_id
      )
      AND m.relationship_type = (
        SELECT relationship_type
        FROM member
        WHERE id = user_id
      )
      AND (
        m.last_lat IS NULL OR
        m.last_long IS NULL OR 
        user_last_long IS NULL OR
        user_last_lat IS NULL OR
        (
          calculate_distance(m.last_lat, m.last_long, user_last_lat, user_last_long) <= 50000
        )
      )
  )
  SELECT m.id AS member_id, ARRAY_AGG(ma.activity_id) AS aggregated_id_activities
	FROM member_activities ma
  JOIN eligible_members em ON ma.member_id = em.id
  JOIN member m ON ma.member_id = m.id
  GROUP BY m.id;
END;
$$ LANGUAGE PLPGSQL;

DROP FUNCTION IF EXISTS create_suggestions;

CREATE OR REPLACE FUNCTION create_suggestions
(user_id INTEGER, prospect_ids INTEGER[])
RETURNS BOOLEAN AS $$
DECLARE
	prospect_id INTEGER;
BEGIN
  FOREACH prospect_id IN ARRAY prospect_ids LOOP
    BEGIN
      INSERT INTO suggestion (member_id_1, member_id_2, situation, date_creation)
      VALUES (user_id, prospect_id, 'pending', CURRENT_DATE);
    EXCEPTION
      WHEN unique_violation THEN
      NULL;
    END;
  END LOOP;

  RETURN TRUE;
END;
$$ LANGUAGE PLPGSQL;

DROP TRIGGER IF EXISTS trigger_create_match ON suggestion;
DROP FUNCTION IF EXISTS create_match_if_mutual;

CREATE OR REPLACE FUNCTION create_match_if_mutual()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.situation = 'yes' THEN
    PERFORM id FROM suggestion
    WHERE member_id_1 = NEW.member_id_2
    AND member_id_2 = NEW.member_id_1
    AND situation = 'yes';

    IF FOUND THEN
      INSERT INTO member_match(suggestion_id, chatroom_name)
      VALUES (NEW.id, CONCAT('chatroom_',NEW.member_id_1, '_' , NEW.member_id_2));
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER trigger_create_match
AFTER UPDATE OF situation ON suggestion
FOR EACH ROW
WHEN (NEW.situation = 'yes')
EXECUTE FUNCTION create_match_if_mutual();

DROP FUNCTION IF EXISTS unmatch;

CREATE OR REPLACE FUNCTION unmatch
(user_id INTEGER, unmatched_id INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
  match_to_delete_id INTEGER;
  suggestion_id_1 INTEGER;
  suggestion_id_2 INTEGER;
BEGIN
  
  UPDATE suggestion SET situation = 'no' 
  WHERE (member_id_1 = user_id AND member_id_2 = unmatched_id)
    OR (member_id_1 = unmatched_id AND member_id_2 = user_id);
  
  
  SELECT id INTO suggestion_id_1 FROM suggestion
  WHERE member_id_1 = user_id AND member_id_2 = unmatched_id;

  SELECT id INTO suggestion_id_2 FROM suggestion
  WHERE member_id_1 = unmatched_id AND member_id_2 = user_id;

  SELECT id INTO match_to_delete_id FROM member_match
  WHERE suggestion_id = suggestion_id_1 OR suggestion_id = suggestion_id_2;

  DELETE FROM msg WHERE match_id = match_to_delete_id;
  
  DELETE FROM member_match WHERE id = match_to_delete_id;

  RETURN TRUE;

END;
$$ LANGUAGE PLPGSQL;

DROP TRIGGER IF EXISTS trigger_unmatch_on_flag ON flagged;
DROP FUNCTION IF EXISTS unmatch_on_flag;

CREATE OR REPLACE FUNCTION unmatch_on_flag()
RETURNS TRIGGER AS $$
DECLARE
  reporter_flagged_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO reporter_flagged_count
  FROM flagged
  WHERE member_id = NEW.reporter_id;

  IF reporter_flagged_count >= 3 THEN
    RAISE EXCEPTION 'FLAGGED TOO MANY TIME';
  END IF;

  PERFORM unmatch(NEW.reporter_id, NEW.member_id);

  RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER trigger_unmatch_on_flag
AFTER INSERT ON flagged
FOR EACH ROW
EXECUTE FUNCTION unmatch_on_flag();


-- NOTIFICATION TRIGGERS & FUNCTIONS

DROP TRIGGER IF EXISTS trigger_notify_on_message ON msg;
DROP FUNCTION IF EXISTS notify_on_message;

CREATE OR REPLACE FUNCTION notify_on_message()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO alert_notification (member_id, subject_id, msg, chatroom_name)
  VALUES (
    (SELECT CASE WHEN NEW.sender_id = m1.member_id_1 THEN m1.member_id_2 ELSE m1.member_id_1 END
    FROM member_match AS mm
    JOIN suggestion AS m1 ON mm.suggestion_id = m1.id
    WHERE mm.id = NEW.match_id),
    NEW.sender_id,
    'You have a new message from ' || (SELECT first_name FROM member WHERE id = NEW.sender_id),
    (SELECT mm.chatroom_name
    FROM member_match AS mm
    WHERE mm.id = NEW.match_id)
  );
  RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER trigger_notify_on_message
AFTER INSERT ON msg
FOR EACH ROW
EXECUTE FUNCTION notify_on_message();

DROP TRIGGER IF EXISTS trigger_notify_on_match ON member_match;
DROP FUNCTION IF EXISTS notify_on_match;


CREATE OR REPLACE FUNCTION notify_on_match()
RETURNS TRIGGER AS $$
DECLARE
  member1 INT;
  member2 INT;
BEGIN

  SELECT member_id_1, member_id_2
  INTO member1, member2
  FROM suggestion
  WHERE id = NEW.suggestion_id;

  INSERT INTO alert_notification (member_id, subject_id, msg, chatroom_name)
  VALUES
    (member1, member2, 'You matched with ' || (SELECT first_name FROM member WHERE id = member2) || '!', NEW.chatroom_name),
    (member2, member1, 'You matched with ' || (SELECT first_name FROM member WHERE id = member1) || '!', NEW.chatroom_name);

  RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;


CREATE TRIGGER trigger_notify_on_match
AFTER INSERT ON member_match
FOR EACH ROW
EXECUTE FUNCTION notify_on_match();

-- INTRICATE FUNCTION BY CHATGEPETO
CREATE OR REPLACE FUNCTION get_chatrooms(user_id INTEGER)
RETURNS TABLE(
    subject_id INTEGER,
    chatroom_name VARCHAR(50),
    sender_id INTEGER,
    sender_first_name VARCHAR,
    message_content TEXT,
    date_sent TEXT
) AS $$
BEGIN
  RETURN QUERY
  WITH LastMessages AS (
    SELECT
      CASE
        WHEN suggestion.member_id_1 = user_id THEN suggestion.member_id_2
        ELSE suggestion.member_id_1
      END AS subject_id,
      member_match.chatroom_name AS chatroom_name,
      chatroom_messages.sender_id AS sender_id,
      chatroom_messages.sender_first_name AS sender_first_name,
      chatroom_messages.message_content AS message_content,
      TO_CHAR(chatroom_messages.date_sent, 'YYYY-MM-DD') AS date_sent,
      ROW_NUMBER() OVER (PARTITION BY member_match.chatroom_name ORDER BY chatroom_messages.date_sent DESC NULLS LAST) AS rn
    FROM suggestion
    JOIN member_match ON member_match.suggestion_id = suggestion.id
    LEFT JOIN chatroom_messages_view AS chatroom_messages 
      ON chatroom_messages.chatroom_name = member_match.chatroom_name
    WHERE suggestion.member_id_1 = user_id OR suggestion.member_id_2 = user_id
  )

  SELECT
    LastMessages.subject_id,  
    LastMessages.chatroom_name,
    LastMessages.sender_id,
    LastMessages.sender_first_name,
    LastMessages.message_content,
    LastMessages.date_sent
  FROM LastMessages
  WHERE LastMessages.rn = 1
  ORDER BY LastMessages.chatroom_name;

END;
$$ LANGUAGE PLPGSQL;


DROP FUNCTION IF EXISTS insert_message;

CREATE OR REPLACE FUNCTION insert_message(
    new_message RECORD
)
RETURNS VOID AS $$
DECLARE
    match_id INTEGER;
BEGIN
  SELECT id INTO match_id
  FROM member_match
  WHERE chatroom_name = new_message.chatroom_name;

  IF match_id IS NOT NULL THEN
      INSERT INTO msg (match_id, sender_id, msg, date_sent)
      VALUES (
          match_id,
          new_message.sender_id,
          new_message.msg,
          new_message.date_sent
      );
  ELSE
      RAISE NOTICE 'Chatroom name not found: %', new_message.chatroom_name;
  END IF;
END;
$$ LANGUAGE PLPGSQL;