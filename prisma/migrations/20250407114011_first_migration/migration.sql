-- CreateEnum
CREATE TYPE "EventTypePlace" AS ENUM ('limit', 'no_limit');

-- CreateEnum
CREATE TYPE "UserTypeBadge" AS ENUM ('basic', 'advanced');

-- CreateEnum
CREATE TYPE "LikeType" AS ENUM ('heart', 'top');

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "user_first_name" VARCHAR(30) NOT NULL,
    "user_name" VARCHAR(30) NOT NULL,
    "user_email" VARCHAR(30) NOT NULL,
    "user_password" VARCHAR(10) NOT NULL,
    "user_badge" "UserTypeBadge" NOT NULL,
    "user_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Event" (
    "event_id" SERIAL NOT NULL,
    "event_titre" TEXT NOT NULL,
    "event_description" TEXT NOT NULL,
    "event_places" "EventTypePlace" NOT NULL,
    "event_places_number" INTEGER NOT NULL,
    "event_date_hour" TIMESTAMP(3) NOT NULL,
    "event_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "Like" (
    "user" INTEGER NOT NULL,
    "event" INTEGER NOT NULL,
    "like_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "LikeType" NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("user","event")
);

-- CreateTable
CREATE TABLE "Registration" (
    "register_user" INTEGER NOT NULL,
    "register_event" INTEGER NOT NULL,
    "register_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("register_user","register_event")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_email_key" ON "User"("user_email");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_event_fkey" FOREIGN KEY ("event") REFERENCES "Event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_register_user_fkey" FOREIGN KEY ("register_user") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_register_event_fkey" FOREIGN KEY ("register_event") REFERENCES "Event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;
