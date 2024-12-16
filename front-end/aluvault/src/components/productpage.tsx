import React from 'react';
import ProductCard from './ProductCard';
import ProductDesc from './productDesc';
import { products } from './products';

const ProductPage: React.FC = () => {
    return (
        <div className="p-4">
            <div className="grid grid-cols-1_auto md:grid-cols-[auto_auto] gap-x-24 gap-y-8 justify-center">
                {products.map((product) => (
                    <ProductCard key={product.id} name={product.name} price={product.price} />
                ))}
            </div>
        </div>
    );
};
export default ProductPage;
