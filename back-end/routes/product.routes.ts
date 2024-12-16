import { Router } from 'express';
import { getProducts } from '../controller/product.controller';

const productRoutes = Router();

productRoutes.get('/', getProducts);

// productRoutes.post('/', addProduct);

export default productRoutes;
