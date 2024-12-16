import { Product } from '../domain/Product';
import productRepository from '../repository/product.db'; // Repository layer

const getProducts = (): Promise<Product[]> => productRepository.getAll();

// const addProduct = (productData: {
//     name: string;
//     price: number;
//     stock: number;
//     description?: string;
// }): Promise<Product> => productRepository.createProduct(productData);

export default {
    getProducts,
    // addProduct,
};
