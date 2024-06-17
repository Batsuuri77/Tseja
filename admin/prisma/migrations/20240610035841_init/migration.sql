/*
  Warnings:

  - You are about to drop the column `design` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `madeBy` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Product` table. All the data in the column will be lost.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `material` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfItems` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pattern` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subCategory` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "subCategory" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "priceInMnt" INTEGER NOT NULL,
    "numberOfItems" INTEGER NOT NULL,
    "fit" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "generalColor" TEXT NOT NULL,
    "pattern" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "isAvailableForOrder" BOOLEAN NOT NULL DEFAULT false,
    "filePath" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isAvailableForPurchase" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("age", "brand", "createdAt", "description", "filePath", "fit", "generalColor", "id", "imagePath", "isAvailableForOrder", "isAvailableForPurchase", "name", "priceInMnt", "season", "sex", "updatedAt") SELECT "age", "brand", "createdAt", "description", "filePath", "fit", "generalColor", "id", "imagePath", "isAvailableForOrder", "isAvailableForPurchase", "name", "priceInMnt", "season", "sex", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pricePaid" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("createdAt", "id", "pricePaid", "productId", "updatedAt", "userId") SELECT "createdAt", "id", "pricePaid", "productId", "updatedAt", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check("Product");
PRAGMA foreign_key_check("Order");
PRAGMA foreign_keys=ON;
