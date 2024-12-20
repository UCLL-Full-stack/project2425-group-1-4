import { Router } from 'express';
import {
    createProduct,
    editProduct,
    getProductById,
    getProducts,
    removeProduct,
} from '../controller/product.controller';

const productRoutes = Router();

productRoutes.get('/', getProducts);
productRoutes.get('/:id', getProductById);
productRoutes.post('/', createProduct);
productRoutes.put('/:id', editProduct);
productRoutes.delete('/:id', removeProduct);

export default productRoutes;
