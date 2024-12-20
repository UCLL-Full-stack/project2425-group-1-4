import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create categories
    const travelCategory = await prisma.category.upsert({
        where: { name: 'Travel' },
        update: {},
        create: {
            name: 'Travel',
        },
    });

    const businessCategory = await prisma.category.upsert({
        where: { name: 'Business' },
        update: {},
        create: {
            name: 'Business',
        },
    });

    const storageCategory = await prisma.category.upsert({
        where: { name: 'Storage' },
        update: {},
        create: {
            name: 'Storage',
        },
    });

    // Create products
    await prisma.product.createMany({
        data: [
            {
                name: 'Aluminum Carry-On Case',
                price: 299.99,
                stock: 50,
                color: 'grey',
                description:
                    'Lightweight and durable aluminum carry-on case perfect for travelers.',
                image: JSON.stringify({
                    topImage: 'https://example.com/images/carry-on-top.jpg',
                    bottomImages: [
                        'https://example.com/images/carry-on-bottom-1.jpg',
                        'https://example.com/images/carry-on-bottom-2.jpg',
                    ],
                }),
            },
            {
                name: 'Aluminum Business Briefcase',
                price: 199.99,
                stock: 30,
                color: 'black',
                description:
                    'Sleek and professional aluminum briefcase for business professionals.',
                image: {
                    topImage: 'https://example.com/images/briefcase-top.jpg',
                    bottomImages: [
                        'https://example.com/images/briefcase-bottom-1.jpg',
                        'https://example.com/images/briefcase-bottom-2.jpg',
                    ],
                },
            },
            {
                name: 'Aluminum Storage Box',
                price: 149.99,
                stock: 100,
                color: 'turquoise',
                description: 'Sturdy aluminum storage box for all your essentials.',
                image: JSON.stringify({
                    topImage: 'https://example.com/images/storage-top.jpg',
                    bottomImages: [
                        'https://example.com/images/storage-bottom-1.jpg',
                        'https://example.com/images/storage-bottom-2.jpg',
                    ],
                }),
            },
        ],
    });

    // Retrieve all products to assign categories
    const products = await prisma.product.findMany();

    // Assign categories to products
    for (const product of products) {
        if (product.name.includes('Carry-On')) {
            await prisma.product.update({
                where: { id: product.id },
                data: { categories: { connect: [{ id: travelCategory.id }] } },
            });
        } else if (product.name.includes('Business')) {
            await prisma.product.update({
                where: { id: product.id },
                data: { categories: { connect: [{ id: businessCategory.id }] } },
            });
        } else if (product.name.includes('Storage')) {
            await prisma.product.update({
                where: { id: product.id },
                data: { categories: { connect: [{ id: storageCategory.id }] } },
            });
        }
    }

    console.log('Database has been seeded!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
