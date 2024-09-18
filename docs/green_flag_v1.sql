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

CREATE TABLE "user" (
  "id" serial PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "email" varchar,
  "date_of_birth" date,
  "gender" gender,
  "preferred_gender" gender,
  "preferred_min_age" integer,
  "preferred_max_age" integer
);

CREATE TABLE "user_activities" (
  "user_id" integer,
  "activity_id" integer,
  PRIMARY KEY ("user_id", "activity_id")
);

CREATE TABLE "activity" (
  "id" serial PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "user_photo" (
  "id" serial PRIMARY KEY,
  "user_id" integer,
  "photo_id" integer
);

CREATE TABLE "photo" (
  "id" serial PRIMARY KEY,
  "encryption_key" varchar,
  "position" integer
);

CREATE TABLE "match" (
  "id" serial PRIMARY KEY,
  "suggestion_id" integer,
  "most_recent_suggestion" date,
  "chatroom_name" varchar,
  "user_id_1" integer UNIQUE,
  "user_id_2" integer UNIQUE
);

CREATE TABLE "message" (
  "id" serial PRIMARY KEY,
  "match_id" integer,
  "receiver_id" integer,
  "text" text NOT NULL,
  "date" date
);

CREATE TABLE "suggestion" (
  "id" serial PRIMARY KEY,
  "date" date,
  "user_id_1" integer UNIQUE,
  "user_id_2" integer UNIQUE,
  "status" status DEFAULT 'pending'
);

COMMENT ON COLUMN "user_activities"."user_id" IS 'PK & FK - contrainte d.unicité';

COMMENT ON COLUMN "user_activities"."activity_id" IS 'PK & FK - contrainte d.unicité';

COMMENT ON COLUMN "photo"."position" IS 'enum de 1 a 5 ou interval?';

COMMENT ON COLUMN "match"."user_id_1" IS 'contrainte unique ensemble';

COMMENT ON TABLE "message" IS 'fonction - exiger acces au BE via table message';

COMMENT ON TABLE "suggestion" IS 'fonction qui update status si les 2, insert auto dans tab Match ';

COMMENT ON COLUMN "suggestion"."user_id_1" IS 'contrainte unique ensemble';

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "user_activities" ("user_id");

ALTER TABLE "activity" ADD FOREIGN KEY ("id") REFERENCES "user_activities" ("activity_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "match" ("user_id_1");

ALTER TABLE "match" ADD FOREIGN KEY ("id") REFERENCES "message" ("match_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "match" ("user_id_2");

ALTER TABLE "suggestion" ADD FOREIGN KEY ("id") REFERENCES "match" ("suggestion_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "suggestion" ("user_id_1");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "suggestion" ("user_id_2");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "message" ("receiver_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "user_photo" ("user_id");

ALTER TABLE "photo" ADD FOREIGN KEY ("id") REFERENCES "user_photo" ("photo_id");
