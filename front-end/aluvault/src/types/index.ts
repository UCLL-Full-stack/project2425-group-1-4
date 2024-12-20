import { StaticImageData } from 'next/image';
export interface Image {
    topImage: string | StaticImageData;
    bottomImages: (string | StaticImageData)[];
}

export interface ProductCategory {
    id: number;
    name: string;
}

export type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
    color: string;
    image: Image;
    description?: string;
    categories: ProductCategory[];
};

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    color: string;
    image: StaticImageData;
}

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export interface User {
    id: number;
    email: string;
    password: string;
    role: UserRole;
}
