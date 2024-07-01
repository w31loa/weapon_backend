import { PrismaClient } from "@prisma/client";
import { seedCategory } from "./seedCategory";
import { seedProduct } from "./seedProduct";
import { seedDocument } from "./seedDocument";
import { seedProductDocument } from "./seedProductDocument";

const prisma = new PrismaClient()

async function main(){
    await seedCategory()
    await seedProduct()
    await seedDocument()
    await seedProductDocument()
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    console.log(`seed error: ${e}`);
    process.exit(1);
  });
