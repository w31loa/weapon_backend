import { PrismaClient } from "@prisma/client"

const prisma =  new PrismaClient()
export async function seedDocument(){
    console.log("document updated")
    const data = [
        {
            "id": 1,
            "url": "3363c9c2-a7f2-4817-87cd-c6c4229b772d.png",
            "name": "3363c9c2-a7f2-4817-87cd-c6c4229b772d.png",
            "size": 18602,
        },
        {
            "id": 2,
            "url": "d4a8c21d-39f6-4182-b65d-92df91187203.png",
            "name": "d4a8c21d-39f6-4182-b65d-92df91187203.png",
            "size": 32033
        },
        {
            "id": 3,
            "url": "a05ece00-718b-47bc-8c1f-6e04e87e24e5.png",
            "name": "a05ece00-718b-47bc-8c1f-6e04e87e24e5.png",
            "size": 23626
        },
        {
            "id": 4,
            "url": "b694183c-9fd0-4fb9-b040-215adae750f6.png",
            "name": "b694183c-9fd0-4fb9-b040-215adae750f6.png",
            "size": 35363
        },
        {
            "id": 5,
            "url": "c4cd40ea-2639-411f-bcab-009bf76de169.png",
            "name": "c4cd40ea-2639-411f-bcab-009bf76de169.png",
            "size": 31333
        },
        {
            "id": 6,
            "url": "7cf08444-fd07-41f5-b7fe-b5895c7da947.png",
            "name": "7cf08444-fd07-41f5-b7fe-b5895c7da947.png",
            "size": 26794
        },
        {
            "id": 7,
            "url": "a5dda23c-18fb-41bd-b8dc-1d5627f0c385.png",
            "name": "a5dda23c-18fb-41bd-b8dc-1d5627f0c385.png",
            "size": 29842
        },
        {
            "id": 8,
            "url": "55a4b467-779e-47f1-b85c-f1a402803e97.png",
            "name": "55a4b467-779e-47f1-b85c-f1a402803e97.png",
            "size": 22617,
        },
        {
            "id": 9,
            "url": "6d716e7b-14eb-4d81-a501-a2599d5cfbf8.png",
            "name": "6d716e7b-14eb-4d81-a501-a2599d5cfbf8.png",
            "size": 266791,
        },
        {
            "id": 10,
            "url": "7dd7bef9-c19b-4590-af8a-e18298526813.png",
            "name": "7dd7bef9-c19b-4590-af8a-e18298526813.png",
            "size": 227037
        },
        {
            "id": 11,
            "url": "0bd5d462-665f-4be1-95df-1df61ecb60c3.png",
            "name": "0bd5d462-665f-4be1-95df-1df61ecb60c3.png",
            "size": 265182,
        },
        {
            "id": 12,
            "url": "d5f9901b-921a-49f7-8b60-0c8609a42e06.png",
            "name": "d5f9901b-921a-49f7-8b60-0c8609a42e06.png",
            "size": 271290
        },
        {
            "id": 13,
            "url": "a4707e22-8b41-4314-bdb2-1f67dbdacd94.png",
            "name": "a4707e22-8b41-4314-bdb2-1f67dbdacd94.png",
            "size": 20638
        },
        {
            "id": 14,
            "url": "ee1b443f-eaee-44a0-97f6-e664d9d81e6c.png",
            "name": "ee1b443f-eaee-44a0-97f6-e664d9d81e6c.png",
            "size": 24651
        }
      
    ]

    for(const document of data){
        await prisma.document.upsert({
            where:{
                id: document.id
            },
            update:{
                id: document.id,
                url: document.url,
                name: document.name,
                size: document.size
            },
            create:{
                id: document.id,
                url: document.url,
                name: document.name,
                size: document.size
            }
        })
    }
}