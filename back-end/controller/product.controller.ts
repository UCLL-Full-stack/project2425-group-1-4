import productService from '../service/product.service';
import { Request, Response } from 'express';
// import { Product } from '../types';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await productService.getProducts();
        res.json(products);
    } catch (error) {
        console.error(error);
    }
};

// export const addProduct = async (req: Request, res: Response) => {
//     try {
//         const { name, price, stock, description, categories } = req.body;

//         if (!name || !price || !stock) {
//             return res.status(400).json({ message: 'Name, price, and stock are required fields.' });
//         }

//         const newProduct = await productService.addProduct({
//             name,
//             price,
//             stock,
//             description,
//         });

//         res.json(newProduct);
//     } catch (error) {
//         console.log(error);
//     }
// };
