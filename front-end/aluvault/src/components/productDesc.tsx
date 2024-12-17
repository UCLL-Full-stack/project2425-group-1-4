import React from 'react';
import { ProductCategory } from '@/types';
interface ProductDescProps {
    name: string;
    description: string;
    categories: ProductCategory[];
}

const ProductDesc: React.FC<ProductDescProps> = ({ name, description, categories }) => {
    return (
        <div>
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="list-disc w-64 my-2 font-semibold">{description}</p>
            <div>
                {categories[0].map((category) => (
                    <p
                        className="bg-slate-100 w-24 text-xs text-black rounded-3xl my-1"
                        key={category.id}
                    >
                        {category.name}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default ProductDesc;
