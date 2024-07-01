import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export async function seedProduct() {
    console.log("product updated")
    const data = [
        {
            id: 1,
            title: 'Сайга-ППК',
            article: 'SGPPK415',
            description: 'Самозарядный карабин Сайга-ППК разработан на базе пистолета-пулемёта ППК20 и максимально унифицирован с ним. Благодаря применяемому патрону 9х19 может использоваться в пистолетных тирах. ',
            price: 104649,
            magazine: 10,
            caliber: '9x19',
            barrel_length: 415,
            category_id: 2
        },
        {
            id: 2,
            title: 'Сайга-223 "Сварог"',
            article: 'SGPSV223',
            description: 'Самозарядный карабин Сайга-223 "Сварог" разработан на базе платформы АК и обладает высокой степенью унификации с ней. Благодаря применению патрона .223 Remington, карабин обеспечивает высокую точность стрельбы и подходит для охоты и спортивной стрельбы. Модульная конструкция позволяет легко адаптировать оружие под различные задачи, а надёжная работа автоматики делает "Сварог" идеальным выбором для стрелков любого уровня подготовки.',
            price: 118990,
            magazine: 14,
            caliber: '223 Rem',
            barrel_length: 415,
            category_id: 2
        },
        {
            id: 3,
            title: 'Сайга-12 исп. 340',
            article: 'SGISP340',
            description: 'Самозарядный карабин Сайга-12 исп. 340 разработан на базе легендарного автомата АК и обладает высокой степенью надёжности и универсальности. Благодаря применению патронов 12-го калибра, этот карабин идеально подходит для охоты, спортивной стрельбы и самообороны. Модульная конструкция и возможность использования различных насадок и аксессуаров позволяют адаптировать Сайгу-12 исп. 340 под любые задачи и условия эксплуатации. Надёжная работа автоматики и эргономичный дизайн делают это оружие отличным выбором как для профессионалов, так и для любителей.',
            price: 93590,
            magazine: 12,
            caliber: '12/76',
            barrel_length: 415,
            category_id: 2
        },
        {
            id: 4,
            title: 'Сайга-12 исп. 33',
            article: 'SGPISP33',
            description: 'Самозарядный карабин Сайга-12 исп. 33 разработан на базе платформы АК и предлагает высокую надежность и универсальность для стрельбы 12-калиберными патронами. Это оружие идеально подходит для охоты, тактических задач и самообороны благодаря своей прочности и эргономичному дизайну. Модульная конструкция карабина позволяет легко адаптировать его под различные условия эксплуатации с помощью сменных насадок и аксессуаров. Сайга-12 исп. 33 обеспечивает стабильную и надежную работу автоматики, делая его отличным выбором для стрелков всех уровней подготовки, от любителей до профессионалов.',
            price: 65490,
            magazine: 10,
            caliber: '12/76',
            barrel_length: 330,
            category_id: 2
        },
        {
            id: 5,
            title: 'Тигр исп. 01',
            article: 'TGRISP1',
            description: 'Самозарядный карабин Тигр исп. 01 разработан на базе легендарной снайперской винтовки Драгунова (СВД) и сохраняет её основные выдающиеся характеристики. Используя патрон 7,62×54 ммR, Тигр исп. 01 обеспечивает высокую точность и дальнобойность, что делает его идеальным выбором для охоты и спортивной стрельбы. Эргономичный дизайн и высокая надежность оружия позволяют комфортно использовать его в самых разных условиях. Тигр исп. 01 оснащен регулируемыми прицельными приспособлениями и возможностью установки оптического прицела, что позволяет стрелку добиться максимальной эффективности прицельной стрельбы на большие расстояния.',
            price: 87900,
            magazine: 4,
            caliber: '7,62x54R',
            barrel_length: 530,
            category_id: 2
        },
        {
            id: 6,
            title: 'Сайга-308 исп. 61',
            article: 'SGISP61',
            description: 'Самозарядный карабин Сайга-308 исп. 61 использует патрон калибра .308 Winchester (7,62×51 мм НАТО) и сочетает в себе надежность конструкции автомата Калашникова с возможностями, предоставляемыми мощным боеприпасом. Этот карабин отлично подходит для охоты на крупную дичь, спортивной стрельбы и тактических задач.',
            price: 58500,
            magazine: 8,
            caliber: '308 Win',
            barrel_length: 415,
            category_id: 2
        },
        {
            id: 7,
            title: 'Baikal 161 Манул',
            article: 'BKL161M',
            description: 'Карабин Baikal 161 "Манул" — это самозарядное охотничье оружие, разработанное на базе конструкции карабина "Сайга". Этот карабин использует патрон калибра .223 Remington (5,56x45 мм), что делает его подходящим для охоты на мелкую и среднюю дичь, спортивной стрельбы и самообороны',
            price: 49300,
            magazine: 4,
            caliber: '22 LR',
            barrel_length: 500,
            category_id: 2
        },
        {
            id: 8,
            title: 'Baikal 121 Лис',
            article: 'BKL121L',
            description: 'Карабин Baikal 121 "Лис" – это самозарядное охотничье оружие, предназначенное для охоты и спортивной стрельбы. Этот карабин разработан на базе популярной и надежной платформы, обеспечивающей отличные эксплуатационные характеристики.',
            price: 35700,
            magazine: 1,
            caliber: '308 Win',
            barrel_length: 600,
            category_id: 2
        },
        {
            id: 9,
            title: 'Сайга-223',
            article: 'SG223',
            description: 'Карабин "Сайга-223" создан на базе знаменитого автомата Калашникова и адаптирован для гражданского использования. Он предназначен для охоты, спортивной стрельбы и самообороны. Патрон .223 Remington (5.56×45 мм) обеспечивает высокую точность и низкую отдачу, что делает карабин удобным и эффективным.',
            price: 52490,
            magazine: 12,
            caliber: '223 Rem',
            barrel_length: 415,
            category_id: 2
        },
        {
            id: 10,
            title: 'Baikal 141 Соболь',
            article: 'BKL141S',
            description: 'Карабин Baikal 141 "Соболь" – это самозарядное охотничье ружье, произведенное концерном "Ижмаш". Оно разработано для удовлетворения потребностей охотников и стрелков соревновательного уровня. Карабин имеет ряд характеристик, которые делают его эффективным для охоты на мелкую и среднюю дичь, а также для спортивной стрельбы.',
            price: 52490,
            magazine: 12,
            caliber: '7,62x39 SP',
            barrel_length: 600,
            category_id: 2
        },

    ]

    for (const product of data) {
        await prisma.product.upsert({
            where: {
                id: product.id
            },
            update: {
                id: product.id,
                title: product.title,
                article: product.article,
                description: product.description,
                price: product.price,
                magazine: product.magazine,
                caliber: product.caliber,
                barrel_length: product.barrel_length,
                category_id: product.category_id
            },
            create: {
                id: product.id,
                title: product.title,
                article: product.article,
                description: product.description,
                price: product.price,
                magazine: product.magazine,
                caliber: product.caliber,
                barrel_length: product.barrel_length,
                category_id: product.category_id
            }
        })
    }
}