import React from 'react';
import Image from 'next/image';
import shoppingCartIcon from '../images/shopping-cart.png';
import { CartItem } from '@/types';

interface ShoppingCartProps {
    cartItems: CartItem[];
    onAddToCart: (item: CartItem) => void;
    onDeleteFromCart: (id: number) => void;
    onCheckout: () => void;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
    cartItems,
    onAddToCart,
    onDeleteFromCart,
    onCheckout,
    isCartOpen,
    setIsCartOpen,
}) => {
    return (
        <div>
            {/* Shopping Cart Icon */}
            <div className="fixed top-4 right-4 z-50">
                <button onClick={() => setIsCartOpen(!isCartOpen)}>
                    <Image
                        src={shoppingCartIcon}
                        alt="Shopping Cart"
                        className="w-12 h-12 object-contain cursor-pointer"
                    />
                </button>
            </div>

            {/* Cart Sidebar */}
            {isCartOpen && (
                <div className="fixed right-0 top-0 h-full w-1/3 bg-gray-800 shadow-md flex flex-col p-4 z-50">
                    <h2 className="text-xl font-bold">Cart</h2>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <ul>
                            {cartItems.map((item, index) => (
                                <li key={index} className="border-b py-2 flex items-center gap-4">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        className="w-12 h-12 object-cover cursor-pointer"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <span>
                                                {item.name} ({item.color})
                                            </span>
                                            <span>
                                                {item.quantity} x ${item.price}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onClick={() => onDeleteFromCart(item.id)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <button className="bg-blue-500 text-white py-2 px-4 mt-4" onClick={onCheckout}>
                        Checkout
                    </button>
                    <button
                        className="bg-gray-300 py-2 px-4 mt-2"
                        onClick={() => setIsCartOpen(false)}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;
