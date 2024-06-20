/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Basket` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Basket_user_id_key" ON "Basket"("user_id");

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
