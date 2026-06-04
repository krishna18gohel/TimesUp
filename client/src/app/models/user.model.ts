export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    phone?: string;
    address?: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    createdAt?: string;
}
