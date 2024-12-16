import React from 'react';

interface ProductCardProps {
    name: string;
    price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price }) => {
    return (
        <a href="./product" className="block w-full sm:w-12/12 md:w-64">
            <div className="border rounded shadow-md p-4 w-full h-96">
                <div className="h-4/6 bg-gray-200 flex items-center justify-center">
                    <img
                        className="w-full h-full object-cover"
                        src="https://assets.awaytravel.com/spree/products/47244/original/37131252-0582-470b-8315-86f286860a57.jpg"
                        alt="suitcases"
                    />
                </div>
                <div className="mt-2 text-center">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="text-gray-600">${price}</p>
                </div>
            </div>
        </a>
    );
};
export default ProductCard;
