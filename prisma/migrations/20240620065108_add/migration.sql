/*
  Warnings:

  - You are about to drop the column `product_id` on the `Document` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `ProductsInBaket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_product_id_fkey";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "product_id";

-- AlterTable
ALTER TABLE "ProductsInBaket" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "ProductDocument" (
    "product_id" INTEGER NOT NULL,
    "document_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "ProductDocument_pkey" PRIMARY KEY ("product_id","document_id")
);

-- AddForeignKey
ALTER TABLE "ProductDocument" ADD CONSTRAINT "product_id_fk" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductDocument" ADD CONSTRAINT "document_id_fk" FOREIGN KEY ("document_id") REFERENCES "Document"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
