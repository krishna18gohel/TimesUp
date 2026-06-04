import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';
import { AuthService } from '../../../services/auth.service';
import { CartItem } from '../../../models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="cart-page">
      <div class="page-header">
        <div class="container">
          <h1 class="section-title">Shopping <span class="gold-text">Cart</span></h1>
        </div>
      </div>
      <div class="container">
        <div class="cart-empty" *ngIf="items.length === 0">
          <span class="empty-icon">🛒</span>
          <h2>Your cart is empty</h2>
          <p>Discover our collection and add some luxury timepieces!</p>
          <a routerLink="/watches" class="btn btn-primary">Browse Watches</a>
        </div>

        <div class="cart-content" *ngIf="items.length > 0">
          <div class="cart-items">
            <div class="cart-item" *ngFor="let item of items">
              <img [src]="item.product.image" [alt]="item.product.name" class="cart-item-img">
              <div class="cart-item-info">
                <h3>{{ item.product.name }}</h3>
                <span class="cart-item-brand">{{ item.product.brand }}</span>
                <span class="cart-item-price">₹{{ item.product.price.toLocaleString() }}</span>
              </div>
              <div class="cart-item-qty">
                <button (click)="updateQty(item, item.quantity - 1)">−</button>
                <span>{{ item.quantity }}</span>
                <button (click)="updateQty(item, item.quantity + 1)">+</button>
              </div>
              <span class="cart-item-total">₹{{ (item.product.price * item.quantity).toLocaleString() }}</span>
              <button class="remove-btn" (click)="remove(item.product._id)">✕</button>
            </div>
          </div>

          <div class="cart-summary">
            <h3>Order Summary</h3>
            <div class="summary-row">
              <span>Subtotal</span>
              <span>₹{{ getTotal().toLocaleString() }}</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span class="free-shipping">FREE</span>
            </div>
            <div class="summary-row total">
              <span>Total</span>
              <span>₹{{ getTotal().toLocaleString() }}</span>
            </div>

            <div class="checkout-section" *ngIf="showCheckout">
              <h4>Shipping Address</h4>
              <div class="form-group">
                <input type="text" [(ngModel)]="address.street" placeholder="Street Address">
              </div>
              <div class="form-row">
                <div class="form-group">
                  <input type="text" [(ngModel)]="address.city" placeholder="City">
                </div>
                <div class="form-group">
                  <input type="text" [(ngModel)]="address.state" placeholder="State">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <input type="text" [(ngModel)]="address.zipCode" placeholder="Zip Code">
                </div>
                <div class="form-group">
                  <input type="text" [(ngModel)]="address.country" placeholder="Country">
                </div>
              </div>
              
              <h4 style="margin-top: 20px;">Payment Method</h4>
              <div class="payment-methods">
                <label class="payment-method">
                  <input type="radio" name="paymentMethod" value="card" [(ngModel)]="paymentMethod">
                  <span>Credit/Debit Card</span>
                </label>
                <div class="card-details-section" *ngIf="paymentMethod === 'card'">
                  <div class="form-group">
                    <input type="text" [(ngModel)]="cardDetails.cardNumber" placeholder="Card Number" maxlength="16">
                  </div>
                  <div class="form-group">
                    <input type="text" [(ngModel)]="cardDetails.cardHolder" placeholder="Card Holder Name">
                  </div>
                </div>
                <label class="payment-method">
                  <input type="radio" name="paymentMethod" value="cod" [(ngModel)]="paymentMethod">
                  <span>Cash on Delivery</span>
                </label>
              </div>

              <button class="btn btn-primary full-width" (click)="placeOrder()" id="place-order-btn">Place Order</button>
            </div>

            <button class="btn btn-primary full-width" *ngIf="!showCheckout" (click)="checkout()" id="checkout-btn">
              Proceed to Checkout
            </button>
            <button class="btn btn-danger btn-sm full-width" (click)="clearCart()" style="margin-top: 12px;">Clear Cart</button>
          </div>
        </div>

        <div class="order-success" *ngIf="orderPlaced">
          <span>🎉</span>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your purchase. You can track your order in your profile.</p>
          <a routerLink="/profile" class="btn btn-primary">View Orders</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-page { padding-top: 40px; }
    .page-header { padding: 60px 0 40px; }
    .cart-empty { text-align: center; padding: 80px 0; }
    .empty-icon { font-size: 4rem; display: block; margin-bottom: 20px; }
    .cart-empty h2 { font-family: var(--font-heading); margin-bottom: 12px; }
    .cart-empty p { color: var(--text-secondary); margin-bottom: 24px; }
    .cart-content { display: grid; grid-template-columns: 1fr 380px; gap: 40px; align-items: start; }
    .cart-item {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 20px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      margin-bottom: 16px;
    }
    .cart-item-img { width: 100px; height: 100px; object-fit: cover; border-radius: var(--radius-sm); }
    .cart-item-info { flex: 1; }
    .cart-item-info h3 { font-family: var(--font-heading); font-size: 1rem; margin-bottom: 4px; }
    .cart-item-brand { color: var(--gold); font-size: 0.8rem; display: block; margin-bottom: 4px; }
    .cart-item-price { color: var(--text-secondary); font-size: 0.9rem; }
    .cart-item-qty {
      display: flex;
      align-items: center;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      overflow: hidden;
    }
    .cart-item-qty button {
      width: 36px;
      height: 36px;
      background: var(--bg-hover);
      border: none;
      color: var(--text-primary);
      cursor: pointer;
    }
    .cart-item-qty span { width: 40px; text-align: center; font-weight: 600; }
    .cart-item-total { font-weight: 700; color: var(--gold); min-width: 100px; text-align: right; }
    .remove-btn { background: none; border: none; color: var(--text-muted); font-size: 1.2rem; cursor: pointer; padding: 8px; }
    .remove-btn:hover { color: var(--danger); }
    .cart-summary {
      padding: 32px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      position: sticky;
      top: 100px;
    }
    .cart-summary h3 { font-family: var(--font-heading); margin-bottom: 24px; font-size: 1.3rem; }
    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid var(--border);
      color: var(--text-secondary);
    }
    .summary-row.total {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--gold);
      border-bottom: none;
      margin-bottom: 24px;
      padding-top: 16px;
    }
    .free-shipping { color: var(--success); font-weight: 600; }
    .full-width { width: 100%; }
    .checkout-section { margin-bottom: 16px; }
    .checkout-section h4 { font-family: var(--font-heading); margin-bottom: 16px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .payment-methods { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }
    .payment-method { display: flex; align-items: center; gap: 10px; cursor: pointer; color: var(--text-secondary); }
    .payment-method input { margin: 0; cursor: pointer; }
    .card-details-section { padding-left: 26px; display: flex; flex-direction: column; gap: 12px; margin-top: -4px; margin-bottom: 8px; }
    .order-success {
      text-align: center;
      padding: 80px 0;
      animation: fadeInUp 0.5s ease;
    }
    .order-success span { font-size: 4rem; display: block; margin-bottom: 16px; }
    .order-success h2 { font-family: var(--font-heading); color: var(--success); margin-bottom: 12px; }
    .order-success p { color: var(--text-secondary); margin-bottom: 24px; }
    @media (max-width: 768px) {
      .cart-content { grid-template-columns: 1fr; }
      .cart-item { flex-wrap: wrap; }
      .cart-item-total { min-width: auto; }
    }
  `]
})
export class CartComponent {
  items: CartItem[] = [];
  showCheckout = false;
  orderPlaced = false;
  address = { street: '', city: '', state: '', zipCode: '', country: '' };
  paymentMethod = 'card';
  cardDetails = { cardNumber: '', cardHolder: '' };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {
    this.cartService.cart$.subscribe(items => this.items = items);
  }

  updateQty(item: CartItem, qty: number) {
    if (qty < 1) return;
    this.cartService.updateQuantity(item.product._id, qty);
  }

  remove(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  checkout() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.showCheckout = true;
  }

  placeOrder() {
    const orderData = {
      items: this.items.map(item => ({
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image
      })),
      totalAmount: this.getTotal(),
      shippingAddress: this.address,
      paymentMethod: this.paymentMethod
    };
    this.orderService.placeOrder(orderData).subscribe(() => {
      this.cartService.clearCart();
      this.orderPlaced = true;
      this.showCheckout = false;
    });
  }
}
