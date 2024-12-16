import React from 'react';
import Image from 'next/image';
import BlackFront from '@/images/BlackFront.png';

interface ProductCardProps {
    id: number;
    name: string;
    price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price }) => {
    const handleClick = () => {
        window.location.href = `/product?id=${id}`;
    };

    return (
        <div onClick={handleClick} className="block w-full sm:w-12/12 md:w-64 cursor-pointer">
            <div className="border rounded shadow-md p-4 w-full h-96">
                <div className="h-4/6 bg-gray-200 flex items-center justify-center">
                    <Image
                        className="w-full h-full object-cover"
                        src={BlackFront}
                        alt="suitcases"
                    />
                </div>
                <div className="mt-2 text-center">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="text-gray-600">${price}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
