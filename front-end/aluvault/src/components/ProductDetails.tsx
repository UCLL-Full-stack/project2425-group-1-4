// Updated ProductDetails Component
import React, { useState } from 'react';

interface ProductDetailsProps {
    price: string;
    colors: ('black' | 'grey' | 'turquoise')[];
    onColorChange: (color: 'black' | 'grey' | 'turquoise') => void;
    onAddToCart: (quantity: number) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
    price,
    colors,
    onColorChange,
    onAddToCart,
}) => {
    const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
    const [quantity, setQuantity] = useState<number>(1);

    const basePrice = parseFloat(price);
    const totalPrice = (basePrice * quantity).toFixed(2);

    const handleColorClick = (color: 'black' | 'grey' | 'turquoise') => {
        setSelectedColor(color);
        onColorChange(color);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddToCart(quantity);
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, parseInt(e.target.value) || 1);
        setQuantity(value);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-64">
            {/* Price Row */}
            <div className="flex justify-between items-center">
                <div className="font-medium">Price</div>
                <div className="text-right font-bold">${basePrice}</div>
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
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="font-medium">Total Price</div>
                <div className="text-right font-bold">${totalPrice}</div>
            </div>

            <button type="submit" className="border-gray-300 border w-64 py-1 mt-3">
                Add to Cart
            </button>
        </form>
    );
};

export default ProductDetails;
