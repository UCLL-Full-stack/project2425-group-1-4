import React from 'react';
import { products } from './products';

const ProductDesc: React.FC = () => {
    return (
        <div>
            <h2 className="text-xl font-bold ">Aluminium Suitcase</h2>
            <p className="list-disc w-64 my-2 font-semibold">
                Premium aluminum suitcase with reinforced edges and spacious compartments.
            </p>
        </div>
    );
};

export default ProductDesc;
