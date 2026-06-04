export interface Product {
    _id: string;
    name: string;
    brand: string;
    price: number;
    description: string;
    image: string;
    category: string;
    stock: number;
    rating: number;
    features?: string[];
    isActive?: boolean;
    createdAt?: string;
}
