/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Wishlist` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Wishlist" DROP CONSTRAINT "Wishlist_destinationId_fkey";

-- CreateTable
CREATE TABLE "_DestinationToWishlist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DestinationToWishlist_AB_unique" ON "_DestinationToWishlist"("A", "B");

-- CreateIndex
CREATE INDEX "_DestinationToWishlist_B_index" ON "_DestinationToWishlist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_userId_key" ON "Wishlist"("userId");

-- AddForeignKey
ALTER TABLE "_DestinationToWishlist" ADD CONSTRAINT "_DestinationToWishlist_A_fkey" FOREIGN KEY ("A") REFERENCES "Destination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DestinationToWishlist" ADD CONSTRAINT "_DestinationToWishlist_B_fkey" FOREIGN KEY ("B") REFERENCES "Wishlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
