CREATE TYPE "gender" AS ENUM (
  'f',
  'm',
  'x'
);

CREATE TYPE "status" AS ENUM (
  'pending',
  'yes',
  'no'
);

CREATE TYPE "relationship" AS ENUM (
  'fun',
  'shortterm',
  'longterm'
);

CREATE TYPE "reason_flagged" AS ENUM (
  'unavailable',
  'creep',
  'unanswering messages'
);

CREATE TABLE "notification" (
  "user_id" integer PRIMARY KEY,
  "read" boolean,
  "text" text
);

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "password" varchar,
  "email" varchar,
  "date_of_birth" date,
  "gender" gender,
  "preferred_gender" gender,
  "preferred_min_age" integer,
  "preferred_max_age" integer,
  "relationship_type" relationship,
  "height" integer,
  "religion" varchar,
  "wants_kids" bool,
  "city" varchar,
  "last_lat" double,
  "last_long" double,
  "token" varchar,
  "email_confirmed" bool
);

CREATE TABLE "user_activities" (
  "user_id" integer,
  "activity_id" integer,
  PRIMARY KEY ("user_id", "activity_id")
);

CREATE TABLE "flagged" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "reporter_id" integer,
  "reason" reason_flagged
);

CREATE TABLE "activity" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "user_photo" (
  "user_id" integer,
  "photo_id" integer,
  PRIMARY KEY ("user_id", "photo_id")
);

CREATE TABLE "photo" (
  "id" SERIAL PRIMARY KEY,
  "encryption_key" varchar,
  "position" integer
);

CREATE TABLE "match" (
  "id" SERIAL PRIMARY KEY,
  "suggestion_id" integer,
  "chatroom_name" varchar
);

CREATE TABLE "message" (
  "id" SERIAL PRIMARY KEY,
  "match_id" integer,
  "sender_id" integer,
  "text" text NOT NULL,
  "date" date
);

CREATE TABLE "suggestion" (
  "id" SERIAL PRIMARY KEY,
  "date" date,
  "user_id_1" integer UNIQUE,
  "user_id_2" integer UNIQUE,
  "status" status DEFAULT 'pending'
);

COMMENT ON COLUMN "user"."token" IS 'regeneré a chaque heure';

COMMENT ON COLUMN "user_activities"."activity_id" IS 'PK & FK - contrainte d.unicité';

COMMENT ON COLUMN "photo"."position" IS 'enum de 1 a 5 ou interval?';

COMMENT ON COLUMN "match"."chatroom_name" IS 'maybe chatroom id and message points to a chatroom id';

COMMENT ON TABLE "message" IS 'fonction - exiger acces au BE via table message';

COMMENT ON TABLE "suggestion" IS 'fonction qui update status si les 2, insert auto dans tab Match ';

COMMENT ON COLUMN "suggestion"."user_id_1" IS 'contrainte unique ensemble';

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "user_activities" ("user_id");

ALTER TABLE "activity" ADD FOREIGN KEY ("id") REFERENCES "user_activities" ("activity_id");

ALTER TABLE "match" ADD FOREIGN KEY ("id") REFERENCES "message" ("match_id");

ALTER TABLE "suggestion" ADD FOREIGN KEY ("id") REFERENCES "match" ("suggestion_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "suggestion" ("user_id_1");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "suggestion" ("user_id_2");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "message" ("sender_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "user_photo" ("user_id");

ALTER TABLE "photo" ADD FOREIGN KEY ("id") REFERENCES "user_photo" ("photo_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "flagged" ("user_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "flagged" ("reporter_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "notification" ("user_id");
