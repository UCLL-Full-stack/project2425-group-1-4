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

import { Product } from '@/types';

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
        name: 'Алюмінієва валіза для ручного багажу',
        price: 199.99,
        stock: 50,
        description:
            'Легка та міцна алюмінієва валіза для ручного багажу із замками, схваленими TSA.',
        color: 'чорний',
        image: imagesByColor['black'],
        categories: [
            { id: 1, name: 'Ручний багаж' },
            { id: 2, name: 'Алюміній' },
        ],
    },
    {
        id: 2,
        name: 'Валіза з жорстким алюмінієвим корпусом',
        price: 299.99,
        stock: 30,
        description: 'Преміальна алюмінієва валіза з посиленими краями та просторими відділеннями.',
        color: 'сірий',
        image: imagesByColor['grey'],
        categories: [
            { id: 3, name: 'Жорсткий корпус' },
            { id: 2, name: 'Алюміній' },
        ],
    },
    {
        id: 3,
        name: 'Велика алюмінієва валіза для подорожей',
        price: 399.99,
        stock: 20,
        description:
            'Простора валіза, ідеальна для далеких подорожей, з подвійними замками та плавними колесами.',
        color: 'бірюзовий',
        image: imagesByColor['turquoise'],
        categories: [
            { id: 4, name: 'Подорожі' },
            { id: 2, name: 'Алюміній' },
        ],
    },
    {
        id: 4,
        name: 'Компактна алюмінієва валіза',
        price: 149.99,
        stock: 60,
        description: 'Невелика, але міцна алюмінієва валіза, ідеальна для коротких подорожей.',
        color: 'чорний',
        image: imagesByColor['black'],
        categories: [
            { id: 5, name: 'Компактна' },
            { id: 2, name: 'Алюміній' },
        ],
    },
    {
        id: 5,
        name: 'Алюмінієва валіза-спінер',
        price: 229.99,
        stock: 40,
        description: 'Алюмінієва валіза з чотирма колесами для легкої маневреності.',
        color: 'сірий',
        image: imagesByColor['grey'],
        categories: [
            { id: 6, name: 'Спінер' },
            { id: 2, name: 'Алюміній' },
        ],
    },
    {
        id: 6,
        name: 'Розкішна алюмінієва валіза',
        price: 499.99,
        stock: 10,
        description: 'Елегантна алюмінієва валіза зі шкіряними вставками та преміальним покриттям.',
        color: 'бірюзовий',
        image: imagesByColor['turquoise'],
        categories: [
            { id: 7, name: 'Розкіш' },
            { id: 2, name: 'Алюміній' },
        ],
    },
];
