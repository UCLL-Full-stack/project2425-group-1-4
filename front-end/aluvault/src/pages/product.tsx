import React, { useState } from 'react';
import ImageGallery from '../components/imageGallery';
import './globals.css';
import Header from '../components/header';
import ProductDesc from '../components/productDesc';
import ProductDetails from '../components/ProductDetails';
import Footer from '@/components/footer';

import BlackFront from '../images/BlackFront.png';
import BlackBack from '../images/BlackBack.png';
import BlackSide1 from '../images/BlackSide1.png';
import BlackSide2 from '../images/BlackSide2.png';

import GreyFront from '../images/GreyFront.png';
import GreyBack from '../images/GreyBack.png';
import GreySide1 from '../images/GreySide1.png';
import GreySide2 from '../images/GreySide2.png';

import TurquoiseFront from '../images/TurquoiseFront.png';
import TurquoiseBack from '../images/TurquoiseBack.png';
import TurquoiseSide1 from '../images/TurquoiseSide1.png';
import TurquoiseSide2 from '../images/TurquoiseSide2.png';

const Product = () => {
    const imagesByColor = {
        black: {
            topImage: BlackFront,
            bottomImages: [BlackBack, BlackSide1, BlackSide2],
        },
        grey: {
            topImage: GreyFront,
            bottomImages: [GreyBack, GreySide1, GreySide2],
        },
        turquoise: {
            topImage: TurquoiseFront,
            bottomImages: [TurquoiseBack, TurquoiseSide1, TurquoiseSide2],
        },
    };

    const [selectedColor, setSelectedColor] = useState<'black' | 'grey' | 'turquoise'>('black');

    
    const handleColorChange = (color: 'black' | 'grey' | 'turquoise') => {
        setSelectedColor(color);
    };

    return (
        <div>
            <div>
                <Header />
            </div>
            <div className="flex flex-row justify-center gap-16 mt-32">
                <div className="flex flex-col justify-center items-center">
                    {/* Pass dynamic images to ImageGallery */}
                    <ImageGallery
                        topImage={imagesByColor[selectedColor].topImage}
                        bottomImages={imagesByColor[selectedColor].bottomImages}
                    />
                </div>
                <div className="flex flex-col">
                    <ProductDesc />
                    {/* Pass handleColorChange to ProductDetails */}
                    <ProductDetails
                        price="150$"
                        colors={['black', 'grey', 'turquoise']}
                        onColorChange={handleColorChange}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Product;
