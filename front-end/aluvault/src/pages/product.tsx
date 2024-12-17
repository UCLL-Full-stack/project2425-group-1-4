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

const ProductPage = () => {
    const [selectedColor, setSelectedColor] = useState<'black' | 'grey' | 'turquoise'>('black');
    const [product, setProduct] = useState<Product | null>(null);

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
                        price={`${product.price}$`}
                        colors={['black', 'grey', 'turquoise']}
                        onColorChange={handleColorChange}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductPage;
