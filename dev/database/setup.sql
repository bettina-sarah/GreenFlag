DROP TABLE IF EXISTS member CASCADE;
DROP TABLE IF EXISTS activity CASCADE;
DROP TABLE IF EXISTS photo CASCADE;
DROP TABLE IF EXISTS member_activities CASCADE;
DROP TABLE IF EXISTS flagged CASCADE;
DROP TABLE IF EXISTS alert_notification CASCADE;
DROP TABLE IF EXISTS member_photo CASCADE;
DROP TABLE IF EXISTS suggestion CASCADE;
DROP TABLE IF EXISTS msg CASCADE;
DROP TABLE IF EXISTS member_match CASCADE;
DROP TYPE IF EXISTS GENDER;
DROP TYPE IF EXISTS SUGGESTION_STATUS;
DROP TYPE IF EXISTS RELATIONSHIP;
DROP TYPE IF EXISTS REASON_FLAGGED;

DROP VIEW IF EXISTS member_photos_view;
DROP VIEW IF EXISTS member_activities_view;



CREATE TYPE GENDER AS ENUM (
'Non-Binary', 'Male', 'Female', 'Other'
);

CREATE TYPE SUGGESTION_STATUS AS ENUM (
  'pending',
  'yes',
  'no'
);

CREATE TYPE RELATIONSHIP AS ENUM (
  'fun',
  'shortterm',
  'longterm'
);

CREATE TYPE REASON_FLAGGED AS ENUM (
  'Inappropriate msgs',
  'Fake profile',
  'Harassment or bullying',
  'Spam or promotion',
  'Looking for casual hookups',
  'Ghosting or inconsistent communication',
  'Misleading profile information'
);

CREATE TABLE member (
  id                SERIAL            PRIMARY KEY,
  first_name        VARCHAR(50)           NOT NULL,
  last_name         VARCHAR(50)           NOT NULL,
  member_password   VARCHAR(20)          NOT NULL,
  email             VARCHAR(255) UNIQUE    NOT NULL,
  date_of_birth     DATE DEFAULT NULL,
  gender            GENDER DEFAULT 'Other',
bio TEXT,
  preferred_genders  GENDER[] DEFAULT '{}',
  min_age INTEGER DEFAULT 18,
  max_age INTEGER DEFAULT 99,
  relationship_type RELATIONSHIP DEFAULT 'longterm',
  height            INTEGER CHECK (height > 0),
  religion          VARCHAR(50) DEFAULT NULL,
  want_kids        BOOL DEFAULT FALSE,
  city              VARCHAR(100),
  last_lat          DOUBLE PRECISION DEFAULT NULL,
  last_long         DOUBLE PRECISION DEFAULT NULL,
  token             VARCHAR(255),
  email_confirmed   BOOL DEFAULT FALSE
);

CREATE TABLE activity (
  id                SERIAL PRIMARY KEY,
  activity_name     VARCHAR(50) UNIQUE
);

CREATE TABLE photo (
  id                SERIAL PRIMARY KEY,
  encryption_key    VARCHAR(128) NOT NULL,
  position          INTEGER CHECK (position BETWEEN 0 AND 3)
);

CREATE TABLE member_activities (
  member_id         INTEGER,
  activity_id       INTEGER,
  PRIMARY KEY (member_id, activity_id)
);

CREATE TABLE flagged (
  id                INTEGER PRIMARY KEY,
  member_id         INTEGER NOT NULL,
  reporter_id       INTEGER NOT NULL,
  reason            REASON_FLAGGED NOT NULL 
);

CREATE TABLE alert_notification (
  member_id         INTEGER PRIMARY KEY,
  subject_id        INTEGER NOT NULL,
  msg               TEXT NOT NULL,
  is_read           BOOLEAN DEFAULT FALSE
);

CREATE TABLE member_photo (
  member_id         INTEGER,
  photo_id          INTEGER,
  PRIMARY KEY (member_id, photo_id)
);

CREATE TABLE suggestion (
  id                SERIAL PRIMARY KEY,
  date_creation     DATE NOT NULL,
  member_id_1       INTEGER UNIQUE NOT NULL,
  member_id_2       INTEGER UNIQUE NOT NULL,
  situation         SUGGESTION_STATUS DEFAULT 'pending'
);

CREATE TABLE member_match (
  id                SERIAL PRIMARY KEY,
  suggestion_id     INTEGER UNIQUE NOT NULL,
  chatroom_name     VARCHAR(50) NOT NULL
);

CREATE TABLE msg (
  id                SERIAL PRIMARY KEY,
  match_id          INTEGER NOT NULL,
  sender_id         INTEGER NOT NULL,
  msg               TEXT NOT NULL,
  date_sent         DATE NOT NULL
);

ALTER TABLE member_activities ADD FOREIGN KEY (activity_id) REFERENCES activity (id);
ALTER TABLE member_activities ADD FOREIGN KEY (member_id) REFERENCES member (id);

ALTER TABLE flagged ADD FOREIGN KEY (member_id) REFERENCES member (id);
ALTER TABLE flagged ADD FOREIGN KEY (reporter_id) REFERENCES member (id);

ALTER TABLE alert_notification ADD FOREIGN KEY (member_id) REFERENCES member (id);
ALTER TABLE alert_notification ADD FOREIGN KEY (subject_id) REFERENCES member (id);

ALTER TABLE member_photo ADD FOREIGN KEY (photo_id) REFERENCES photo (id);
ALTER TABLE member_photo ADD FOREIGN KEY (member_id) REFERENCES member (id);

ALTER TABLE suggestion ADD FOREIGN KEY (member_id_1) REFERENCES member (id);
ALTER TABLE suggestion ADD FOREIGN KEY (member_id_2) REFERENCES member (id);

ALTER TABLE member_match ADD FOREIGN KEY (suggestion_id) REFERENCES suggestion (id);

ALTER TABLE msg ADD FOREIGN KEY (match_id) REFERENCES member_match (id);
ALTER TABLE msg ADD FOREIGN KEY (sender_id) REFERENCES member (id);


INSERT INTO activity (activity_name)
VALUES
  ('hiking'),
  ('yoga'),
  ('photography'),
  ('cooking'),
  ('traveling'),
  ('reading'),
  ('videogaming'),
  ('biking'),
  ('running'),
  ('watchingmovies'),
  ('workingout'),
  ('dancing'),
  ('playinginstrument'),
  ('attendingconcerts'),
  ('painting'),
  ('volunteering'),
  ('playingsports'),
  ('crafting'),
  ('petlover'),
  ('learningnewlanguage')

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

INSERT INTO member (first_name, last_name, member_password, email, date_of_birth, gender, preferred_genders, min_age, max_age, relationship_type, height, religion, want_kids, city, token, email_confirmed) 


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
        SELECT preferred_genders
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
  )
  SELECT m.id AS member_id, ARRAY_AGG(ma.activity_id) AS aggregated_id_activities
	FROM member_activities ma
  JOIN eligible_members em ON ma.member_id = em.id
  JOIN member m ON ma.member_id = m.id
  GROUP BY m.id;
END;
$$ LANGUAGE PLPGSQL;INSERT INTO member (first_name, last_name, member_password, email, date_of_birth, gender, preferred_genders, min_age, max_age, relationship_type, height, religion, want_kids, city, token, email_confirmed) 

VALUES
('John', 'Doe', 'password123', 'john.doe1@example.com', '1990-05-12', 'Male'::GENDER, ARRAY['Female', 'Non-Binary']::GENDER[], 20, 35, 'longterm'::RELATIONSHIP, 180, NULL, TRUE, 'New York', 'token12345', TRUE),
('Jane', 'Smith', 'password123', 'jane.smith2@example.com', '1988-11-22', 'Female'::GENDER, ARRAY['Male']::GENDER[], 25, 40, 'shortterm'::RELATIONSHIP, 165, NULL, FALSE, 'Los Angeles', 'token12346', FALSE),
('Alice', 'Brown', 'password123', 'alice.brown3@example.com', '1995-06-15', 'Female'::GENDER, ARRAY['Male', 'Female']::GENDER[], 18, 30, 'fun'::RELATIONSHIP, 170, NULL, TRUE, 'Chicago', 'token12347', TRUE),
('Michael', 'Johnson', 'password123', 'michael.johnson4@example.com', '1982-09-08', 'Male'::GENDER, ARRAY['Female', 'Other']::GENDER[], 28, 50, 'longterm'::RELATIONSHIP, 175, NULL, TRUE, 'Houston', 'token12348', FALSE),
('Emily', 'Davis', 'password123', 'emily.davis5@example.com', '1993-04-30', 'Female'::GENDER, ARRAY['Male']::GENDER[], 22, 45, 'longterm'::RELATIONSHIP, 160, NULL, TRUE, 'Phoenix', 'token12349', TRUE),
('David', 'Miller', 'password123', 'david.miller6@example.com', '1978-12-14', 'Male'::GENDER, ARRAY['Non-Binary']::GENDER[], 30, 55, 'shortterm'::RELATIONSHIP, 190, NULL, FALSE, 'Philadelphia', 'token12350', FALSE),
('Sophia', 'Wilson', 'password123', 'sophia.wilson7@example.com', '1997-03-18', 'Female'::GENDER, ARRAY['Female']::GENDER[], 21, 40, 'fun'::RELATIONSHIP, 155, NULL, TRUE, 'San Antonio', 'token12351', TRUE),
('James', 'Moore', 'password123', 'james.moore8@example.com', '1985-07-25', 'Male'::GENDER, ARRAY['Female', 'Other']::GENDER[], 26, 38, 'shortterm'::RELATIONSHIP, 185, NULL, FALSE, 'San Diego', 'token12352', FALSE),
('Olivia', 'Taylor', 'password123', 'olivia.taylor9@example.com', '1990-02-03', 'Female'::GENDER, ARRAY['Male']::GENDER[], 24, 50, 'longterm'::RELATIONSHIP, 168, NULL, TRUE, 'Dallas', 'token12353', TRUE),
('Daniel', 'Anderson', 'password123', 'daniel.anderson10@example.com', '1989-08-10', 'Male'::GENDER, ARRAY['Female', 'Non-Binary']::GENDER[], 27, 45, 'fun'::RELATIONSHIP, 172, NULL, TRUE, 'San Jose', 'token12354', FALSE),
('Emma', 'Thomas', 'password123', 'emma.thomas11@example.com', '1996-05-21', 'Female'::GENDER, ARRAY['Male']::GENDER[], 23, 39, 'longterm'::RELATIONSHIP, 162, NULL, FALSE, 'Austin', 'token12355', TRUE),
('Christopher', 'Jackson', 'password123', 'christopher.jackson12@example.com', '1977-01-12', 'Male'::GENDER, ARRAY['Female']::GENDER[], 31, 60, 'shortterm'::RELATIONSHIP, 195, NULL, TRUE, 'Jacksonville', 'token12356', FALSE),
('Isabella', 'White', 'password123', 'isabella.white13@example.com', '1994-11-09', 'Female'::GENDER, ARRAY['Female']::GENDER[], 20, 35, 'fun'::RELATIONSHIP, 167, NULL, TRUE, 'San Francisco', 'token12357', TRUE),
('Matthew', 'Harris', 'password123', 'matthew.harris14@example.com', '1980-03-02', 'Male'::GENDER, ARRAY['Male']::GENDER[], 29, 48, 'longterm'::RELATIONSHIP, 178, NULL, TRUE, 'Columbus', 'token12358', FALSE),
('Ava', 'Martin', 'password123', 'ava.martin15@example.com', '1991-07-13', 'Female'::GENDER, ARRAY['Female']::GENDER[], 19, 33, 'shortterm'::RELATIONSHIP, 158, NULL, TRUE, 'Fort Worth', 'token12359', TRUE),
('Anthony', 'Garcia', 'password123', 'anthony.garcia16@example.com', '1984-06-28', 'Male'::GENDER, ARRAY['Female']::GENDER[], 32, 46, 'fun'::RELATIONSHIP, 182, NULL, FALSE, 'Indianapolis', 'token12360', FALSE),
('Mia', 'Martinez', 'password123', 'mia.martinez17@example.com', '1992-10-05', 'Female'::GENDER, ARRAY['Female']::GENDER[], 24, 41, 'longterm'::RELATIONSHIP, 161, NULL, TRUE, 'Charlotte', 'token12361', TRUE),
('Joshua', 'Rodriguez', 'password123', 'joshua.rodriguez18@example.com', '1987-02-15', 'Male'::GENDER, ARRAY['Female', 'Non-Binary']::GENDER[], 26, 50, 'shortterm'::RELATIONSHIP, 188, NULL, FALSE, 'Seattle', 'token12362', FALSE),
('Amelia', 'Lopez', 'password123', 'amelia.lopez19@example.com', '1993-09-30', 'Female'::GENDER, ARRAY['Female']::GENDER[], 22, 38, 'fun'::RELATIONSHIP, 164, NULL, TRUE, 'Denver', 'token12363', TRUE),
('Ethan', 'Gonzalez', 'password123', 'ethan.gonzalez20@example.com', '1983-12-07', 'Male'::GENDER, ARRAY['Male']::GENDER[], 30, 55, 'longterm'::RELATIONSHIP, 183, NULL, TRUE, 'Washington', 'token12364', FALSE);
