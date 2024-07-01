import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export async function seedProductDocument() {
    console.log("productDocument updated")
    const data = [
        {
            product_id: 8,
            document_id: 1
        },
        {
            product_id: 10,
            document_id: 2
        },
        {
            product_id: 7,
            document_id: 3
        },
        {
            product_id: 4,
            document_id: 4
        },
        {
            product_id: 9,
            document_id: 5
        },
        {
            product_id: 2,
            document_id: 6
        },
        {
            product_id: 6,
            document_id: 7
        },
        {
            product_id: 1,
            document_id: 8
        },
        {
            product_id: 1,
            document_id: 9
        },
        {
            product_id: 1,
            document_id: 10
        },
        {
            product_id: 1,
            document_id: 11
        },
        {
            product_id: 1,
            document_id: 12
        },
        {
            product_id: 5,
            document_id: 13
        },
        {
            product_id: 3,
            document_id: 14
        },

    ]

    for (const document of data) {
        await prisma.productDocument.upsert({
            where: {
                product_id_document_id: {
                    product_id: document.product_id,
                    document_id: document.document_id
                }
            },
            update: {
                product_id: document.product_id,
                document_id: document.document_id
            },
            create: {
                product_id: document.product_id,
                document_id: document.document_id
            }
        })
    }
}