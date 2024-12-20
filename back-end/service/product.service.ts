import { Product } from '../domain/Product';
import productRepository from '../repository/product.db'; // Repository layer

const getProducts = (): Promise<Product[]> => productRepository.getAll();
const getProductById = (id: number) => productRepository.getProductById(id);

const addProduct = async (data: any) => {
    return await productRepository.addProduct(data);
};

const deleteProduct = async (id: number) => {
    return await productRepository.deleteProduct(id);
};

const updateProduct = async (id: number, data: any) => {
    return await productRepository.updateProduct(id, data);
};

export default {
    getProducts,
    getProductById,
    addProduct,
    deleteProduct,
    updateProduct,
};
