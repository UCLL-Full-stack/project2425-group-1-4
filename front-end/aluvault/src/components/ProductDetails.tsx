import React, { useState } from 'react';

interface ProductDetailsProps {
    price: string;
    colors: ('black' | 'grey' | 'turquoise')[];
    onColorChange: (color: 'black' | 'grey' | 'turquoise') => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ price, colors, onColorChange }) => {
    const [selectedColor, setSelectedColor] = useState<string>(colors[0]);

    const handleColorClick = (color: 'black' | 'grey' | 'turquoise') => {
        setSelectedColor(color);
        onColorChange(color);
    };

    return (
        <div className="flex flex-col gap-4 w-64">
            {/* Price Row */}
            <div className="flex justify-between items-center">
                <div className="font-medium">Price</div>
                <div className="text-right font-bold">{price}</div>
            </div>

            {/* Colour Row */}
            <div className="flex justify-between items-center">
                <div className="font-medium">Colour</div>
                <div className="flex gap-2">
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            className={`w-6 h-6 border cursor-pointer ${
                                selectedColor === color ? 'ring-2 ring-blue-500' : ''
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorClick(color)}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Quantity Row */}
            <div className="flex justify-between items-center">
                <div className="font-medium">Quantity</div>
                <div>
                    <input
                        type="number"
                        className="w-16 border border-gray-300 rounded px-2 py-1 text-black"
                        min={1}
                        placeholder="1"
                    />
                </div>
            </div>
            <div>
                <button className="border-gray-300 border w-64 py-1 mt-3">Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductDetails;
