import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';
type Props = { products: Product[] };

const ProductsOverview: React.FC<Props> = ({ products }) => {
    return (
        <div className="p-4">
            <div className="grid grid-cols-1_auto md:grid-cols-[auto_auto] gap-x-24 gap-y-8 justify-center">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsOverview;
