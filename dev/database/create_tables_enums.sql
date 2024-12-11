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
  email_confirmed   BOOL DEFAULT FALSE,
  profile_completed BOOL DEFAULT FALSE,
  fake_member     BOOL DEFAULT FALSE
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
  --id                SERIAL PRIMARY KEY,
  member_id         INTEGER NOT NULL,
  reporter_id       INTEGER NOT NULL,
  reason            REASON_FLAGGED NOT NULL,
  PRIMARY KEY (member_id, reporter_id)
);

CREATE TABLE alert_notification (
  id                SERIAL PRIMARY KEY,
  member_id         INTEGER,
  subject_id        INTEGER NOT NULL,
  msg               TEXT NOT NULL,
  chatroom_name     VARCHAR(32) DEFAULT NULL,
  is_read           BOOLEAN DEFAULT FALSE
);

CREATE TABLE member_photo (
  member_id         INTEGER,
  photo_id          INTEGER,
  PRIMARY KEY (member_id, photo_id)
);

CREATE TABLE suggestion (
  id 				        SERIAL NOT NULL UNIQUE,
  date_creation     DATE NOT NULL,
  member_id_1       INTEGER  NOT NULL,
  member_id_2       INTEGER  NOT NULL,
  situation         SUGGESTION_STATUS DEFAULT 'pending',
  PRIMARY KEY (member_id_1, member_id_2)
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
  date_sent         TIMESTAMP NOT NULL
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
  ('learningnewlanguage');

