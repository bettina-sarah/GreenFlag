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
  'f',
  'm',
  'x'
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
  gender            GENDER DEFAULT 'x',
  preferred_gender  GENDER DEFAULT 'x',
  preferred_min_age INTEGER DEFAULT 18,
  preferred_max_age INTEGER DEFAULT 99,
  relationship_type RELATIONSHIP DEFAULT 'longterm',
  height            INTEGER CHECK (height > 0),
  religion          VARCHAR(50) DEFAULT NULL,
  wants_kids        BOOL DEFAULT FALSE,
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

INSERT INTO member (first_name, last_name, member_password, email, date_of_birth, gender, preferred_gender, preferred_min_age, preferred_max_age, relationship_type, height, wants_kids, token, email_confirmed) 
VALUES
('John', 'Doe', 'password123', 'john.doe1@example.com', '1990-05-12', 'm', 'f', 20, 35, 'longterm', 180, TRUE, 'token12345', TRUE),
('Jane', 'Smith', 'password123', 'jane.smith2@example.com', '1988-11-22', 'f', 'm', 25, 40, 'shortterm', 165, FALSE, 'token12346', FALSE),
('Alice', 'Brown', 'password123', 'alice.brown3@example.com', '1995-06-15', 'f', 'm', 18, 30, 'fun', 170, TRUE, 'token12347', TRUE),
('Michael', 'Johnson', 'password123', 'michael.johnson4@example.com', '1982-09-08', 'm', 'f', 28, 50, 'longterm', 175, TRUE, 'token12348', FALSE),
('Emily', 'Davis', 'password123', 'emily.davis5@example.com', '1993-04-30', 'f', 'm', 22, 45, 'longterm', 160, TRUE, 'token12349', TRUE),
('David', 'Miller', 'password123', 'david.miller6@example.com', '1978-12-14', 'm', 'f', 30, 55, 'shortterm', 190, FALSE, 'token12350', FALSE),
('Sophia', 'Wilson', 'password123', 'sophia.wilson7@example.com', '1997-03-18', 'f', 'm', 21, 40, 'fun', 155, TRUE, 'token12351', TRUE),
('James', 'Moore', 'password123', 'james.moore8@example.com', '1985-07-25', 'm', 'f', 26, 38, 'shortterm', 185, FALSE, 'token12352', FALSE),
('Olivia', 'Taylor', 'password123', 'olivia.taylor9@example.com', '1990-02-03', 'f', 'm', 24, 50, 'longterm', 168, TRUE, 'token12353', TRUE),
('Daniel', 'Anderson', 'password123', 'daniel.anderson10@example.com', '1989-08-10', 'm', 'f', 27, 45, 'fun', 172, TRUE, 'token12354', FALSE),
('Emma', 'Thomas', 'password123', 'emma.thomas11@example.com', '1996-05-21', 'f', 'm', 23, 39, 'longterm', 162, FALSE, 'token12355', TRUE),
('Christopher', 'Jackson', 'password123', 'christopher.jackson12@example.com', '1977-01-12', 'm', 'f', 31, 60, 'shortterm', 195, TRUE, 'token12356', FALSE),
('Isabella', 'White', 'password123', 'isabella.white13@example.com', '1994-11-09', 'f', 'm', 20, 35, 'fun', 167, TRUE, 'token12357', TRUE),
('Matthew', 'Harris', 'password123', 'matthew.harris14@example.com', '1980-03-02', 'm', 'f', 29, 48, 'longterm', 178, TRUE, 'token12358', FALSE),
('Ava', 'Martin', 'password123', 'ava.martin15@example.com', '1991-07-13', 'f', 'm', 19, 33, 'shortterm', 158, TRUE, 'token12359', TRUE),
('Anthony', 'Garcia', 'password123', 'anthony.garcia16@example.com', '1984-06-28', 'm', 'f', 32, 46, 'fun', 182, FALSE, 'token12360', FALSE),
('Mia', 'Martinez', 'password123', 'mia.martinez17@example.com', '1992-10-05', 'f', 'm', 24, 41, 'longterm', 161, TRUE, 'token12361', TRUE),
('Joshua', 'Rodriguez', 'password123', 'joshua.rodriguez18@example.com', '1987-02-15', 'm', 'f', 26, 50, 'shortterm', 188, FALSE, 'token12362', FALSE),
('Amelia', 'Lopez', 'password123', 'amelia.lopez19@example.com', '1993-09-30', 'f', 'm', 22, 38, 'fun', 164, TRUE, 'token12363', TRUE),
('Ethan', 'Gonzalez', 'password123', 'ethan.gonzalez20@example.com', '1983-12-07', 'm', 'f', 30, 55, 'longterm', 183, TRUE, 'token12364', FALSE);
