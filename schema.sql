CREATE TABLE "public"."User"
(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    "stripeId" VARCHAR(255),
    facebookId VARCHAR(255),
);

CREATE TABLE "public"."Workout"
(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    description TEXT,
    spots INTEGER,
    "trainerId" INTEGER NOT NULL,
    FOREIGN KEY ("trainerId") REFERENCES "public"."Trainer"(id)
);

/* CREATE TABLE "public"."Trainer"
(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255),
    FOREIGN KEY ("trainerId") REFERENCES "public"."Workout"(id)

); */

CREATE TABLE "_UserToWorkout"
(
    "A" integer NOT NULL REFERENCES "User"(id),
    "B" integer NOT NULL REFERENCES "Workout"(id)
);

CREATE UNIQUE INDEX "_UserToWorkout_AB_unique" ON "_UserToWorkout"("A"
int4_ops,"B" int4_ops);
CREATE INDEX "_UserToWorkout_B_index" ON "_UserToWorkout"("B"
int4_ops);

CREATE TYPE role AS ENUM
('user', 'trainer', 'admin');


CREATE TABLE "Cordinates"
(
    id SERIAL PRIMARY KEY,
    "workoutId" INTEGER NOT NULL UNIQUE,
    city VARCHAR(255),
    address VARCHAR(255),
    latitude FLOAT,
    longitude FLOAT,
    FOREIGN KEY ("workoutId") REFERENCES "Workout"(id)
);

CREATE TABLE "public"."Referral"
(
    id SERIAL PRIMARY KEY NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
    completed BOOLEAN NOT NULL DEFAULT false,
    "referrerId" INTEGER NOT NULL,
    "referredId" INTEGER NOT NULL,
    FOREIGN KEY ("referrerId") REFERENCES "public"."User"(id),
    FOREIGN KEY ("referredId") REFERENCES "public"."User"(id)
);

CREATE OR REPLACE FUNCTION trigger_set_timestamp
()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW
();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE
UPDATE ON "Referral"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp
();

CREATE TABLE "Token"
(
    id SERIAL PRIMARY KEY NOT NULL,
    userID INTEGER NOT NULL references "User" (id) on delete cascade on update cascade,
    "createdAt" timestamptz not null default current_date
)