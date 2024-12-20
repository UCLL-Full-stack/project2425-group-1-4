import { Prisma, PrismaClient } from '@prisma/client';
import { Product } from '../domain/Product';

const prisma = new PrismaClient();

const getAll = async () => {
    const products = await prisma.product.findMany({
        include: {
            categories: true, // Include related categories
        },
    });

    return products.map(Product.from);
};

const getProductById = async (id: number) => {
    return await prisma.product.findUnique({
        where: { id },
        include: {
            categories: true,
        },
    });
};

const addProduct = async (data: Prisma.ProductCreateInput) => {
    return await prisma.product.create({
        data,
    });
};

const deleteProduct = async (id: number) => {
    return await prisma.product.delete({
        where: { id },
    });
};

const updateProduct = async (id: number, data: Partial<Prisma.ProductUpdateInput>) => {
    return await prisma.product.update({
        where: { id },
        data,
    });
};

export default {
    getAll,
    getProductById,
    addProduct,
    deleteProduct,
    updateProduct,
};
