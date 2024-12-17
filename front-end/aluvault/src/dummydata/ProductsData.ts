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
import { StaticImageData } from 'next/image';
import { Image, Product, ProductCategory } from '@/types';
export const imagesByColor = {
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

export const products: Product[] = [
    {
        id: 1,
        name: 'Aluminum Carry-On Suitcase',
        price: 199.99,
        stock: 50,
        description:
            'Lightweight and resilient carry-on aluminum suitcase with TSA-approved locks.',
        color: 'black',
        image: imagesByColor['black'],
        categories: [
            { id: 1, name: 'Carry-On' },
            { id: 2, name: 'Aluminum' },
        ],
    },
    {
        id: 2,
        name: 'Hard Shell Aluminum Suitcase',
        price: 299.99,
        stock: 30,
        description: 'Premium aluminum suitcase with reinforced edges and spacious compartments.',
        color: 'grey',
        image: imagesByColor['grey'],
        categories: [
            { id: 3, name: 'Hard Shell' },
            { id: 2, name: 'Aluminum' },
        ],
    },
    {
        id: 3,
        name: 'Large Aluminum Travel Suitcase',
        price: 399.99,
        stock: 20,
        description: 'Spacious suitcase ideal for long trips, with dual locks and smooth wheels.',
        color: 'turquoise',
        image: imagesByColor['turquoise'],
        categories: [
            { id: 4, name: 'Travel' },
            { id: 2, name: 'Aluminum' },
        ],
    },
    {
        id: 4,
        name: 'Compact Aluminum Suitcase',
        price: 149.99,
        stock: 60,
        description: 'Small yet durable aluminum suitcase perfect for weekend getaways.',
        color: 'black',
        image: imagesByColor['black'],
        categories: [
            { id: 5, name: 'Compact' },
            { id: 2, name: 'Aluminum' },
        ],
    },
    {
        id: 5,
        name: 'Aluminum Spinner Suitcase',
        price: 229.99,
        stock: 40,
        description: 'Four-wheel spinner aluminum suitcase for easy maneuverability.',
        color: 'grey',
        image: imagesByColor['grey'],
        categories: [
            { id: 6, name: 'Spinner' },
            { id: 2, name: 'Aluminum' },
        ],
    },
    {
        id: 6,
        name: 'Luxury Aluminum Suitcase',
        price: 499.99,
        stock: 10,
        description: 'Elegant aluminum suitcase with leather accents and a premium finish.',
        color: 'turquoise',
        image: imagesByColor['turquoise'],
        categories: [
            { id: 7, name: 'Luxury' },
            { id: 2, name: 'Aluminum' },
        ],
    },
];
