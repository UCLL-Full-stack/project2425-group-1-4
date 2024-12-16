import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create Users
    const user1 = await prisma.user.create({
        data: { role: 'USER', email: 'customer1@example.com', password: 'securepassword1' },
    });
    const admin = await prisma.user.create({
        data: { role: 'ADMIN', email: 'admin@example.com', password: 'securepassword2' },
    });

    // Create Categories
    const travel = await prisma.category.create({
        data: { name: 'Travel', description: 'Suitcases for travel and adventure' },
    });
    const business = await prisma.category.create({
        data: { name: 'Business', description: 'Stylish and durable cases for professionals' },
    });
    const storage = await prisma.category.create({
        data: { name: 'Storage', description: 'Heavy-duty storage solutions' },
    });

    // Create Products
    const suitcase1 = await prisma.product.create({
        data: {
            name: 'Compact Travel Suitcase',
            price: 120.0,
            stock: 20,
            description: 'Lightweight aluminum suitcase, perfect for short trips.',
            // categories: {
            //     create: [{ id: travel.id }],
            // },
        },
    });

    const suitcase2 = await prisma.product.create({
        data: {
            name: 'Executive Briefcase',
            price: 200.0,
            stock: 15,
            description: 'Premium aluminum briefcase for business professionals.',
            // categories: {
            //     create: [{ id: business.id }],
            // },
        },
    });

    const suitcase3 = await prisma.product.create({
        data: {
            name: 'Heavy-Duty Storage Case',
            price: 300.0,
            stock: 10,
            description: 'Robust storage case for tools and equipment.',
            //     categories: {
            //         create: [{ id: storage.id }],
            //     },
        },
    });

    // Create Orders
    const order1 = await prisma.order.create({
        data: {
            userId: user1.id,
            totalPrice: 320.0,
            status: 'PENDING',
            items: {
                create: [
                    { productId: suitcase1.id, quantity: 1, finalPrice: 120.0 },
                    { productId: suitcase3.id, quantity: 1, finalPrice: 300.0 },
                ],
            },
        },
    });

    const order2 = await prisma.order.create({
        data: {
            userId: admin.id,
            totalPrice: 200.0,
            status: 'SHIPPED',
            items: { create: [{ productId: suitcase2.id, quantity: 1, finalPrice: 200.0 }] },
        },
    });

    console.log({
        user1,
        admin,
        travel,
        business,
        storage,
        suitcase1,
        suitcase2,
        suitcase3,
        order1,
        order2,
    });
}

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
