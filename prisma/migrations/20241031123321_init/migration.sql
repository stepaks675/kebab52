/*
  Warnings:

  - Added the required column `takeaway` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `products` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "adress" TEXT,
ADD COLUMN     "suggestion" TEXT,
ADD COLUMN     "takeaway" BOOLEAN NOT NULL,
DROP COLUMN "products",
ADD COLUMN     "products" JSONB NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;
