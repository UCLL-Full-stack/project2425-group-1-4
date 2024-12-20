import React, { useState, useEffect } from 'react';
import ImageGallery from '../components/ImageGallery';
import './globals.css';
import Header from '../components/header';
import ProductDesc from '../components/ProductDesc';
import ProductDetails from '../components/ProductDetails';
import Footer from '@/components/footer';
import { products, imagesByColor } from '@/dummydata/ProductsData';
import { Product } from '@/dummydata/ProductsData';
import { CartItem } from '@/types';
import ShoppingCart from '../components/ShoppingCart';

const ProductPage = () => {
    const [selectedColor, setSelectedColor] = useState<'black' | 'grey' | 'turquoise'>('black');
    const [product, setProduct] = useState<Product | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart items from localStorage when the component mounts
    useEffect(() => {
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    // Update localStorage whenever cartItems change
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const productId = parseInt(queryParams.get('id') || '0');

        if (productId) {
            const selectedProduct = products.find((prod) => prod.id === productId);
            setProduct(selectedProduct || null);
        }
    }, []);

    const handleAddToCart = (item: CartItem) => {
        const uniqueId = `${item.id}-${item.color}-${Date.now()}`;
        setCartItems((prevItems) => [
            ...prevItems,
            { ...item, uniqueId }, // Add a uniqueId property
        ]);
        setIsCartOpen(true); // Open the cart when an item is added
    };

    const handleDeleteFromCart = (id: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const handleCheckout = () => {
        console.log('Proceeding to checkout with items:', cartItems);

        setIsCartOpen(false);
        window.location.href = `/checkout`;
    };

    if (!product) {
        return <p>Product not found!</p>;
    }

    return (
        <div>
            <Header />

            {/* Shopping Cart Component */}
            <ShoppingCart
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                onDeleteFromCart={handleDeleteFromCart}
                onCheckout={handleCheckout}
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
            />

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
                        onColorChange={setSelectedColor}
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

            <Footer />
        </div>
    );
};

export default ProductPage;
