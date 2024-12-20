import productService from '../service/product.service';
import { Request, Response } from 'express';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await productService.getProducts();
        res.json(products);
    } catch (error) {
        console.error(error);
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const productId = parseInt(req.params.id);
        if (isNaN(productId)) {
            return res.json({ error: 'Invalid product ID' });
        }
        const product = await productService.getProductById(productId);
        res.json(product);
    } catch (error) {
        console.log(error);
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, stock, color, description, image } = req.body;
        console.log(req.body);
        // Validate input
        if (!name || !price || !stock || !color) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Add product to the database
        const newProduct = await productService.addProduct({
            name,
            price,
            stock,
            color,
            description,
            image,
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add product' });
    }
};

export const removeProduct = async (req: Request, res: Response) => {
    try {
        const productId = parseInt(req.params.id);

        if (isNaN(productId)) {
            return res.status(400).json({ error: 'Invalid product ID' });
        }

        await productService.deleteProduct(productId);

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error: any) {
        console.error(error);

        if (error.code === 'P2025') {
            // Handle case where product doesn't exist
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(500).json({ error: 'Failed to delete product' });
    }
};

export const editProduct = async (req: Request, res: Response) => {
    try {
        const productId = parseInt(req.params.id);

        if (isNaN(productId)) {
            return res.status(400).json({ error: 'Invalid product ID' });
        }

        const { name, price, stock, color } = req.body;

        // Validate input
        if (!name && !price && !stock && !color) {
            return res.status(400).json({ error: 'At least one field is required for update' });
        }

        const updatedProduct = await productService.updateProduct(productId, {
            ...(name && { name }),
            ...(price && { price }),
            ...(stock && { stock }),
            ...(color && { color }),
        });

        res.status(200).json(updatedProduct);
    } catch (error: any) {
        console.error(error);

        if (error.code === 'P2025') {
            // Handle case where product doesn't exist
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(500).json({ error: 'Failed to update product' });
    }
};
