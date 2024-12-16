import { PrismaClient } from '@prisma/client';
import { Product } from '../domain/Product';

const prisma = new PrismaClient();

const getAll = async () => {
    const products = await prisma.product.findMany();

    return products.map(Product.from);
};

const createProduct = async (productData: {
    name: string;
    price: number;
    stock: number;
    description?: string;
    categories?: { id: number; name?: string }[]; // Array of category objects
}) =>
    prisma.product.create({
        data: {
            name: productData.name,
            price: productData.price,
            stock: productData.stock,
            description: productData.description,
        },
    });

export default {
    getAll,
    createProduct,
};
