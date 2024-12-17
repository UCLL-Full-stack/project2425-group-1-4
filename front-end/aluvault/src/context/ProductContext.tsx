import React, { createContext, useContext } from 'react';
import { products, Product } from '../components/products';

const ProductContext = createContext<Product[]>([]);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <ProductContext.Provider value={products}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
    return useContext(ProductContext);
};
