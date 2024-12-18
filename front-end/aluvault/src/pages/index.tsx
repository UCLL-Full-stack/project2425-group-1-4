import './globals.css';
import Header from '../components/header';
import ProductOverview from '@/components/ProductsOverview';
import Footer from '@/components/footer';
import { products } from '@/dummydata/ProductsData';
import { useEffect, useState } from 'react';
import { CartItem } from '@/types';
import ShoppingCart from '@/components/ShoppingCart';
export default function Products() {
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
        setCartItems([]);
        window.location.href = `/checkout`;
    };

    return (
        <div>
            <Header />
            <ShoppingCart
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                onDeleteFromCart={handleDeleteFromCart}
                onCheckout={handleCheckout}
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
            />
            <ProductOverview products={products} />
            <Footer />
        </div>
    );
}
