import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
    private cartItems: CartItem[] = [];
    private cartSubject = new BehaviorSubject<CartItem[]>([]);
    public cart$ = this.cartSubject.asObservable();

    constructor() {
        this.loadCart();
    }

    private loadCart(): void {
        const cart = localStorage.getItem('cart');
        if (cart) {
            this.cartItems = JSON.parse(cart);
            this.cartSubject.next(this.cartItems);
        }
    }

    private saveCart(): void {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        this.cartSubject.next([...this.cartItems]);
    }

    addToCart(product: Product, quantity: number = 1): void {
        const existing = this.cartItems.find(item => item.product._id === product._id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.cartItems.push({ product, quantity });
        }
        this.saveCart();
    }

    removeFromCart(productId: string): void {
        this.cartItems = this.cartItems.filter(item => item.product._id !== productId);
        this.saveCart();
    }

    updateQuantity(productId: string, quantity: number): void {
        const item = this.cartItems.find(item => item.product._id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
        }
    }

    clearCart(): void {
        this.cartItems = [];
        localStorage.removeItem('cart');
        this.cartSubject.next([]);
    }

    getTotal(): number {
        return this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    }

    getItemCount(): number {
        return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    }

    getItems(): CartItem[] {
        return [...this.cartItems];
    }
}
