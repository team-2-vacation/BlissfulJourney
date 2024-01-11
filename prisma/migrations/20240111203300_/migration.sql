/*
  Warnings:

  - You are about to alter the column `name` on the `Attraction` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(35)`.
  - You are about to drop the column `main_attractions` on the `Destination` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `Destination` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(35)`.
  - You are about to alter the column `country` on the `Destination` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(35)`.
  - You are about to alter the column `name` on the `Interest` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(35)`.
  - You are about to alter the column `firstName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(35)`.
  - You are about to alter the column `lastName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(35)`.
  - You are about to drop the `BookingsWishlist` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Wishlist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageURL` to the `Attraction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attraction" ADD COLUMN     "imageURL" TEXT NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(35);

-- AlterTable
ALTER TABLE "Destination" DROP COLUMN "main_attractions",
ALTER COLUMN "name" SET DATA TYPE VARCHAR(35),
ALTER COLUMN "country" SET DATA TYPE VARCHAR(35);

-- AlterTable
ALTER TABLE "Interest" ALTER COLUMN "name" SET DATA TYPE VARCHAR(35);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(35),
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(35);

-- DropTable
DROP TABLE "BookingsWishlist";

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "destinationId" INTEGER NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'WISHLIST',
    "booking_date" TIMESTAMP(3),
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Interest" (
    "userId" INTEGER NOT NULL,
    "interestId" INTEGER NOT NULL,

    CONSTRAINT "User_Interest_pkey" PRIMARY KEY ("userId","interestId")
);

-- CreateTable
CREATE TABLE "Destination_Interest" (
    "destinationId" INTEGER NOT NULL,
    "interestId" INTEGER NOT NULL,

    CONSTRAINT "Destination_Interest_pkey" PRIMARY KEY ("destinationId","interestId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_userId_key" ON "Wishlist"("userId");

-- AddForeignKey
ALTER TABLE "Attraction" ADD CONSTRAINT "Attraction_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Interest" ADD CONSTRAINT "User_Interest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Interest" ADD CONSTRAINT "User_Interest_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "Interest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Destination_Interest" ADD CONSTRAINT "Destination_Interest_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Destination_Interest" ADD CONSTRAINT "Destination_Interest_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "Interest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
