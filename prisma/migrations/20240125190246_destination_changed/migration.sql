/*
  Warnings:

  - You are about to drop the `_DestinationToWishlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DestinationToWishlist" DROP CONSTRAINT "_DestinationToWishlist_A_fkey";

-- DropForeignKey
ALTER TABLE "_DestinationToWishlist" DROP CONSTRAINT "_DestinationToWishlist_B_fkey";

-- DropTable
DROP TABLE "_DestinationToWishlist";

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
