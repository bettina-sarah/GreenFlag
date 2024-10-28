DROP VIEW IF EXISTS member_photos_view;
DROP VIEW IF EXISTS member_activities_view;

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
  a.id AS activity_id, 
  a.activity_name
FROM 
  member AS m
INNER JOIN member_activities AS ma ON m.id = ma.member_id
INNER JOIN activity AS a ON ma.activity_id = a.id;


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
  DELETE from member_photo USING member 
  WHERE member_photo.member_id = member.id AND member.id = user_id;
  DELETE from photo WHERE photo.encryption_key = key;
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

CREATE OR REPLACE FUNCTION find_eligible_members_activities
(user_id INTEGER)
RETURNS TABLE(member_id INT, aggregated_id_activities INT[])
AS $$
BEGIN
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
  )

  SELECT user_id AS member_id, ARRAY_AGG(activity_id) AS aggregated_id_activities
  FROM member_activities
  WHERE member_id = user_id
  GROUP BY user_id;

  UNION ALL

  SELECT m.id AS member_id, ARRAY_AGG(ma.activity_id) AS aggregated_id_activities
	FROM member_activities ma
  JOIN eligible_members em ON ma.member_id = em.id
  JOIN member m ON ma.member_id = m.id
  GROUP BY m.id;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION get_user_info
(user_id INTEGER)
RETURNS TABLE(
  first_name VARCHAR,
  last_name VARCHAR,
  age INT,
  gender gender,
  religion VARCHAR,
  want_kids BOOLEAN,
  city VARCHAR,
  activities TEXT[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    m.first_name,
    m.last_name,
    EXTRACT(YEAR FROM AGE(m.date_of_birth))::INT AS age,
    m.gender,
    m.religion,
    m.want_kids,
    m.city
    ARRAY_AGG(a.activity_name) AS activities
  FROM
    member m
  LEFT JOIN
    member_activities ma on m.id = ma.member_id
  LEFT JOIN
    activity a ON ma.activity_id = a.id
  WHERE
    m.id = user_id
  GROUP BY
    m.id;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION create_suggestion
(user_id INTEGER, prospect_id INTEGER)
RETURNS INT AS $$
DECLARE
  reversed_suggestion_id INT;
  new_suggestion_id INT;
BEGIN
  SELECT id INTO reversed_suggestion_id
  FROM suggestion
  WHERE member_id_1 = prospect_id
    AND member_id_2 = user_id
    AND situation = "pending";

  INSERT INTO suggestion (member_id_1, member_id_2, situation, date_creation)
    VALUES (user_id, prospect_id, 'pending', CURRENT_DATE)
    RETURNING id INTO new_suggestion_id;
  
  IF reversed_suggestion_id IS NOT NULL THEN
    INSERT INTO member_match (suggestion_id, chatroom_name)
    VALUES( reversed_suggestion_id, CONCAT('chat_', reversed_suggestion_id));

    UPDATE suggestion
    SET situation = 'yes'
    WHERE id = reversed_suggestion_id;

    UPDATE suggestion
    SET situation = 'yes'
    WHERE id = new_suggestion_id;
  END IF;

  RETURN new_suggestion_id;
END;
$$ LANGUAGE PLPGSQL;
