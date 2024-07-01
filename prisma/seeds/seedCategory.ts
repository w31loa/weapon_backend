import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export async function seedCategory() {
    console.log("category updated")
    const data = [
        {
            id: 1,
            title: "Эксклюзив"
        },
        {
            id: 2,
            title: "Первое ружьё"
        },
        {
            id: 3,
            title: "Пневматическое оружие"
        },
        {
            id: 4,
            title: "Нарезное оружие"
        },
        {
            id: 5,
            title: "Гладкоствольное оружие"
        },
        {
            id: 6,
            title: "Спортивные пистолеты"
        }
    ] 

    for (const category of data) {
        await prisma.category.upsert({
            where: {
                id: category.id
            },
            update: {
                id: category.id,
                title: category.title
            },
            create: {
                id: category.id,
                title: category.title
            }
        })
    }
}