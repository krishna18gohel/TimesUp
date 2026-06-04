import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { OrderService } from '../../../services/order.service';
import { User } from '../../../models/user.model';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="profile-page">
      <div class="page-header">
        <div class="container">
          <h1 class="section-title">My <span class="gold-text">Profile</span></h1>
        </div>
      </div>
      <div class="container">
        <div class="profile-grid" *ngIf="user">
          <div class="profile-card">
            <div class="profile-avatar">{{ user.name.charAt(0).toUpperCase() }}</div>
            <h2>{{ user.name }}</h2>
            <p>{{ user.email }}</p>
            <span class="role-badge">{{ user.role }}</span>

            <form (ngSubmit)="updateProfile()" class="profile-form">
              <div class="form-group">
                <label>Name</label>
                <input type="text" [(ngModel)]="user.name" name="name">
              </div>
              <div class="form-group">
                <label>Phone</label>
                <input type="text" [(ngModel)]="user.phone" name="phone" placeholder="Phone number">
              </div>
              <button type="submit" class="btn btn-primary btn-sm">Update Profile</button>
              <div class="update-msg" *ngIf="updated">✓ Profile updated!</div>
            </form>
          </div>

          <div class="orders-section">
            <h2>Order <span class="gold-text">History</span></h2>
            <div class="order-empty" *ngIf="orders.length === 0">
              <p>No orders yet. Start shopping!</p>
            </div>
            <div class="order-card" *ngFor="let order of orders">
              <div class="order-header">
                <div>
                  <span class="order-id">Order #{{ order._id.slice(-8).toUpperCase() }}</span>
                  <span class="order-date">{{ order.createdAt | date:'mediumDate' }} • Payment: <span style="text-transform: capitalize;">{{ order.paymentMethod }}</span></span>
                </div>
                <span class="badge" [ngClass]="'badge-' + order.status">{{ order.status }}</span>
              </div>
              <div class="order-items">
                <div class="order-item" *ngFor="let item of order.items">
                  <span>{{ item.name }} × {{ item.quantity }}</span>
                  <span>₹{{ (item.price * item.quantity).toLocaleString() }}</span>
                </div>
              </div>
              <div class="order-total">
                <strong>Total: ₹{{ order.totalAmount.toLocaleString() }}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-page { padding-top: 40px; }
    .page-header { padding: 60px 0 40px; }
    .profile-grid { display: grid; grid-template-columns: 350px 1fr; gap: 40px; align-items: start; }
    .profile-card {
      padding: 40px 32px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      text-align: center;
      position: sticky;
      top: 100px;
    }
    .profile-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--gold), var(--gold-dark));
      color: #000;
      font-size: 2rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
    }
    .profile-card h2 { font-family: var(--font-heading); margin-bottom: 4px; }
    .profile-card p { color: var(--text-secondary); margin-bottom: 8px; font-size: 0.9rem; }
    .role-badge {
      display: inline-block;
      background: var(--bg-hover);
      color: var(--gold);
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.75rem;
      text-transform: uppercase;
      font-weight: 600;
      margin-bottom: 24px;
    }
    .profile-form { text-align: left; }
    .update-msg { color: var(--success); font-size: 0.85rem; margin-top: 8px; text-align: center; }
    .orders-section h2 { font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 24px; }
    .order-empty p { color: var(--text-secondary); }
    .order-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 24px;
      margin-bottom: 16px;
    }
    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border);
    }
    .order-id { font-weight: 600; display: block; margin-bottom: 4px; }
    .order-date { color: var(--text-muted); font-size: 0.8rem; }
    .order-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      color: var(--text-secondary);
      font-size: 0.9rem;
    }
    .order-total {
      padding-top: 12px;
      border-top: 1px solid var(--border);
      text-align: right;
      color: var(--gold);
      margin-top: 8px;
    }
    @media (max-width: 768px) {
      .profile-grid { grid-template-columns: 1fr; }
      .profile-card { position: static; }
    }
  `]
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  orders: Order[] = [];
  updated = false;

  constructor(private authService: AuthService, private orderService: OrderService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(user => this.user = user);
    this.orderService.getMyOrders().subscribe(orders => this.orders = orders);
  }

  updateProfile() {
    if (!this.user) return;
    this.authService.updateProfile({ name: this.user.name, phone: this.user.phone }).subscribe(() => {
      this.updated = true;
      setTimeout(() => this.updated = false, 3000);
    });
  }
}
