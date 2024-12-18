import React, { useState, useEffect } from 'react';
import ImageGallery from '../components/ImageGallery';
import './globals.css';
import Header from '../components/header';
import ProductDesc from '../components/ProductDesc';
import ProductDetails from '../components/ProductDetails';
import Footer from '@/components/footer';
import { products } from '@/dummydata/ProductsData';
import { imagesByColor } from '@/dummydata/ProductsData';
import { Product } from '@/dummydata/ProductsData';
import { CartItem } from '@/types';
import Image from 'next/image';

const ProductPage = () => {
    const [selectedColor, setSelectedColor] = useState<'black' | 'grey' | 'turquoise'>('black');
    const [product, setProduct] = useState<Product | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const productId = parseInt(queryParams.get('id') || '0');

        if (productId) {
            const selectedProduct = products.find((prod) => prod.id === productId);
            setProduct(selectedProduct || null);
        }
    }, []);

    const handleColorChange = (color: 'black' | 'grey' | 'turquoise') => {
        setSelectedColor(color);
    };

    const handleAddToCart = (item: CartItem) => {
        setCartItems((prevItems) => [...prevItems, item]);
        setIsCartOpen(true);
    };

    const handleDeleteFromCart = (id: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const handleCheckout = () => {
        console.log('Proceeding to checkout with items:', cartItems);
        setCartItems([]);
        setIsCartOpen(false);
        window.location.href = `/checkout`;
    };

    const handleRedirectToProduct = (id: number) => {
        window.location.href = `/product?id=${id}`;
    };

    if (!product) {
        return <p>Product not found!</p>;
    }

    return (
        <div>
            <Header />
            <div className="flex flex-row justify-center gap-16 mt-32">
                <div className="flex flex-col justify-center items-center">
                    <ImageGallery
                        topImage={imagesByColor[selectedColor].topImage}
                        bottomImages={imagesByColor[selectedColor].bottomImages}
                    />
                </div>
                <div className="flex flex-col">
                    <ProductDesc
                        name={product.name}
                        description={product.description || ''}
                        categories={[product.categories]}
                    />
                    <ProductDetails
                        price={`${product.price}`}
                        colors={['black', 'grey', 'turquoise']}
                        onColorChange={handleColorChange}
                        onAddToCart={(quantity) =>
                            handleAddToCart({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                quantity,
                                color: selectedColor,
                                image: imagesByColor[selectedColor].topImage,
                            })
                        }
                    />
                </div>
            </div>

            {/* Cart Sidebar */}
            {isCartOpen && (
                <div className="fixed right-0 top-0 h-full w-1/3 bg-gray-800 shadow-md flex flex-col p-4">
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
                                        onClick={() => handleRedirectToProduct(item.id)}
                                    />
                                    <div
                                        className="flex-1 cursor-pointer"
                                        onClick={() => handleRedirectToProduct(item.id)}
                                    >
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
                                        onClick={() => handleDeleteFromCart(item.id)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <button
                        className="bg-blue-500 text-white py-2 px-4 mt-4"
                        onClick={handleCheckout}
                    >
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
            <Footer />
        </div>
    );
};

export default ProductPage;
