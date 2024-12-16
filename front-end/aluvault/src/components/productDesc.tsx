import React from 'react';

interface ProductDescProps {
    name: string;
    description: string;
}

const ProductDesc: React.FC<ProductDescProps> = ({ name, description }) => {
    return (
        <div>
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="list-disc w-64 my-2 font-semibold">{description}</p>
        </div>
    );
};

export default ProductDesc;
