import React from 'react';
import Image from 'next/image';
import { products } from '@/dummydata/ProductsData';
import { ProductCategory } from '@/types';

interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    categories: ProductCategory[];
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, categories }) => {
    const handleClick = () => {
        window.location.href = `/product?id=${id}`;
    };

    const product = products.find((p) => p.id === id);
    const topImage = product?.image?.topImage;

    return (
        <div onClick={handleClick} className="block w-full sm:w-12/12 md:w-64 cursor-pointer">
            <div className="border rounded shadow-md p-4 w-full h-128">
                <div className="h-4/6 bg-gray-200 flex items-center justify-center">
                    {topImage ? (
                        <Image className="w-full h-full object-cover" src={topImage} alt={name} />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <p>No Image</p>
                        </div>
                    )}
                </div>
                <div className="mt-2 text-center">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="text-gray-600">${price}</p>
                    <div>
                        {categories.map((category) => (
                            <p
                                className="bg-slate-100 w-24 m-auto text-xs text-black rounded-3xl my-1"
                                key={category.id}
                            >
                                {category.name}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;
