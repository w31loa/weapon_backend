-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER,
    "product_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Documents_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "login" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Catecory" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "category_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "magazine" INTEGER NOT NULL,
    "caliber" TEXT NOT NULL,
    "barrel_length" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "product_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Basket" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "basket_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductsInBaket" (
    "basket_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "ProductsInBaket_pkey" PRIMARY KEY ("product_id","basket_id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "basket_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "order_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Documents_image_id_key" ON "Document"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_uindex" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_uindex" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "category_id_uindex" ON "Catecory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "product_id_uindex" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "basket_id_uindex" ON "Basket"("id");

-- CreateIndex
CREATE UNIQUE INDEX "order_id_uindex" ON "Order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_basket_id_key" ON "Order"("basket_id");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Catecory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsInBaket" ADD CONSTRAINT "ProductsInBaket_basket_id_fkey" FOREIGN KEY ("basket_id") REFERENCES "Basket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsInBaket" ADD CONSTRAINT "ProductsInBaket_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_basket_id_fkey" FOREIGN KEY ("basket_id") REFERENCES "Basket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
