import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h1>Dashboard</h1>
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-icon">👥</span>
          <div class="stat-info">
            <span class="stat-number">{{ stats?.usersCount || 0 }}</span>
            <span class="stat-label">Total Users</span>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">⌚</span>
          <div class="stat-info">
            <span class="stat-number">{{ stats?.productsCount || 0 }}</span>
            <span class="stat-label">Products</span>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">🛍️</span>
          <div class="stat-info">
            <span class="stat-number">{{ stats?.ordersCount || 0 }}</span>
            <span class="stat-label">Orders</span>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">💰</span>
          <div class="stat-info">
            <span class="stat-number">₹{{ (stats?.totalRevenue || 0).toLocaleString() }}</span>
            <span class="stat-label">Revenue</span>
          </div>
        </div>
      </div>

      <div class="recent-orders">
        <h2>Recent Orders</h2>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let order of stats?.recentOrders">
                <td>#{{ order._id.slice(-8).toUpperCase() }}</td>
                <td>{{ order.user?.name || 'N/A' }}</td>
                <td class="amount">₹{{ order.totalAmount.toLocaleString() }}</td>
                <td><span class="badge" [ngClass]="'badge-' + order.status">{{ order.status }}</span></td>
                <td>{{ order.createdAt | date:'shortDate' }}</td>
              </tr>
            </tbody>
          </table>
          <p class="no-data" *ngIf="!stats?.recentOrders?.length">No orders yet.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard h1 { font-family: var(--font-heading); font-size: 2rem; margin-bottom: 32px; }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 48px; }
    .stat-card {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 28px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      transition: var(--transition);
    }
    .stat-card:hover { border-color: var(--gold); transform: translateY(-2px); }
    .stat-icon { font-size: 2.5rem; }
    .stat-number { display: block; font-size: 1.8rem; font-weight: 700; color: var(--gold); font-family: var(--font-heading); }
    .stat-label { color: var(--text-secondary); font-size: 0.85rem; }
    .recent-orders h2 { font-family: var(--font-heading); font-size: 1.4rem; margin-bottom: 20px; }
    .table-wrapper {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      overflow: hidden;
    }
    table { width: 100%; border-collapse: collapse; }
    th {
      text-align: left;
      padding: 14px 20px;
      background: var(--bg-hover);
      color: var(--text-secondary);
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
    }
    td { padding: 14px 20px; border-top: 1px solid var(--border); font-size: 0.9rem; }
    .amount { color: var(--gold); font-weight: 600; }
    .no-data { padding: 40px; text-align: center; color: var(--text-muted); }
    @media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 768px) { .stats-grid { grid-template-columns: 1fr; } }
  `]
})
export class DashboardComponent implements OnInit {
  stats: any = null;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getDashboard().subscribe(data => this.stats = data);
  }
}
