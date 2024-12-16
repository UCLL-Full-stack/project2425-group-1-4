export interface ProductCategory {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    description?: string;
    categories: ProductCategory[];
}

export const products: Product[] = [
    {
        id: 1,
        name: 'Aluminum Carry-On Suitcase',
        price: 199.99,
        stock: 50,
        description: 'Lightweight and durable carry-on aluminum suitcase with TSA-approved locks.',
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
        categories: [
            { id: 7, name: 'Luxury' },
            { id: 2, name: 'Aluminum' },
        ],
    },
];
