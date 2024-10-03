DROP TABLE IF EXISTS user CASCADE;
DROP TABLE IF EXISTS activity CASCADE;
DROP TABLE IF EXISTS photo CASCADE;
DROP TABLE IF EXISTS user_activities CASCADE;
DROP TABLE IF EXISTS flagged CASCADE;
DROP TABLE IF EXISTS notification CASCADE;
DROP TABLE IF EXISTS user_photo CASCADE;
DROP TABLE IF EXISTS suggestion CASCADE;
DROP TABLE IF EXISTS message CASCADE;
DROP TABLE IF EXISTS match CASCADE;

CREATE TYPE GENDER AS ENUM (
  'f',
  'm',
  'x'
);

CREATE TYPE STATUS AS ENUM (
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
  'Inappropriate messages',
  'Fake profile',
  'Harassment or bullying',
  'Spam or promotion',
  'Looking for casual hookups',
  'Ghosting or inconsistent communication',
  'Misleading profile information'
);

CREATE TABLE user (
  id                SERIAL            PRIMARY KEY,
  first_name        VARCHAR(50)           NOT NULL,
  last_name         VARCHAR(50)           NOT NULL,
  password          VARCHAR(128)          NOT NULL,
  email             VARCHAR(255) UNIQUE    NOT NULL,
  date_of_birth     DATE DEFAULT NULL,
  gender            GENDER DEFAULT 'x',
  preferred_gender  GENDER DEFAULT 'x',
  preferred_min_age INTEGER DEFAULT 18,
  preferred_max_age INTEGER DEFAULT 60,
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
  name              VARCHAR(50) UNIQUE
);

CREATE TABLE photo (
  id                SERIAL PRIMARY KEY,
  encryption_key    VARCHAR(128) NOT NULL,
  position          INTEGER CHECK (position BETWEEN 0 AND 3),
);

CREATE TABLE user_activities (
  user_id           INTEGER,
  activity_id       INTEGER,
  PRIMARY KEY (user_id, activity_id)
);

CREATE TABLE flagged (
  id                INTEGER PRIMARY KEY,
  user_id           INTEGER NOT NULL,
  reporter_id       INTEGER NOT NULL,
  reason            REASON_FLAGGED NOT NULL 
);

CREATE TABLE alert_notification (
  user_id           INTEGER PRIMARY KEY,
  subject_id        INTEGER NOT NULL,
  text_message      TEXT NOT NULL,
  is_read           BOOLEAN DEFAULT FALSE
);

CREATE TABLE user_photo (
  user_id           INTEGER,
  photo_id          INTEGER,
  PRIMARY KEY (user_id, photo_id)
);

CREATE TABLE suggestion (
  id                SERIAL PRIMARY KEY,
  date_creation     DATE NOT NULL,
  user_id_1         INTEGER UNIQUE NOT NULL,
  user_id_2         INTEGER UNIQUE NOT NULL,
  situation         STATUS DEFAULT 'pending'
);

CREATE TABLE match (
  id                SERIAL PRIMARY KEY,
  suggestion_id     INTEGER UNIQUE NOT NULL,
  chatroom_name     VARCHAR(50) NOT NULL
);

CREATE TABLE message (
  id                SERIAL PRIMARY KEY,
  match_id          INTEGER NOT NULL,
  sender_id         INTEGER NOT NULL,
  text_message      TEXT NOT NULL,
  date_envoi        DATE NOT NULL
);

ALTER TABLE user_activities ADD FOREIGN KEY (activity_id) REFERENCES activity (id)
ALTER TABLE user_activities ADD FOREIGN KEY (user_id) REFERENCES user (id)

ALTER TABLE flagged ADD FOREIGN KEY (user_id) REFERENCES user (id)
ALTER TABLE flagged ADD FOREIGN KEY (reporter_id) REFERENCES user (id)

ALTER TABLE alert_notification ADD FOREIGN KEY (user_id) REFERENCES user (id)
ALTER TABLE alert_notification ADD FOREIGN KEY (subject_id) REFERENCES user (id)

ALTER TABLE user_photo ADD FOREIGN KEY (photo_id) REFERENCES photo (id)
ALTER TABLE user_photo ADD FOREIGN KEY (user_id) REFERENCES user (id)

ALTER TABLE suggestion ADD FOREIGN KEY (user_id_1) REFERENCES user (id)
ALTER TABLE suggestion ADD FOREIGN KEY (user_id_2) REFERENCES user (id)

ALTER TABLE match ADD FOREIGN KEY (suggestion_id) REFERENCES suggestion (id)

ALTER TABLE message ADD FOREIGN KEY (match_id) REFERENCES match (id),
ALTER TABLE message ADD FOREIGN KEY (sender_id) REFERENCES user (id)

COMMENT ON COLUMN user.token IS 'regeneré a chaque heure';

COMMENT ON COLUMN user_activities.activity_id IS 'PK & FK - contrainte d.unicité';

COMMENT ON COLUMN "photo.position IS 'enum de 1 a 5 ou interval?';

COMMENT ON COLUMN match.chatroom_name IS 'maybe chatroom id and message points to a chatroom id';

COMMENT ON TABLE message IS 'fonction - exiger acces au BE via table message';

COMMENT ON TABLE suggestion IS 'fonction qui update status si les 2, insert auto dans tab Match ';

COMMENT ON COLUMN suggestion.user_id_1 IS 'contrainte unique ensemble';