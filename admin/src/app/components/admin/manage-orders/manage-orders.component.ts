import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="manage-orders">
      <h1>Manage Orders</h1>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let order of orders">
              <td class="order-id">#{{ order._id.slice(-8).toUpperCase() }}</td>
              <td>{{ order.user?.name || 'N/A' }}</td>
              <td>{{ order.items.length }} item(s)</td>
              <td class="price-cell">₹{{ order.totalAmount.toLocaleString() }}</td>
              <td><span class="badge" [ngClass]="'badge-' + order.status">{{ order.status }}</span></td>
              <td>{{ order.createdAt | date:'shortDate' }}</td>
              <td style="text-transform: capitalize;">{{ order.paymentMethod || 'card' }}</td>
              <td>
                <select [ngModel]="order.status" (ngModelChange)="updateStatus(order._id, $event)" class="status-select">
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="no-data" *ngIf="orders.length === 0">No orders found.</p>
      </div>
    </div>
  `,
  styles: [`
    .manage-orders h1 { font-family: var(--font-heading); font-size: 2rem; margin-bottom: 32px; }
    .table-wrapper {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      overflow-x: auto;
    }
    table { width: 100%; border-collapse: collapse; }
    th {
      text-align: left;
      padding: 14px 16px;
      background: var(--bg-hover);
      color: var(--text-secondary);
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
    }
    td { padding: 14px 16px; border-top: 1px solid var(--border); font-size: 0.9rem; }
    .order-id { font-weight: 600; }
    .price-cell { color: var(--gold); font-weight: 600; }
    .status-select {
      padding: 6px 12px;
      background: var(--bg-input);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      color: var(--text-primary);
      font-size: 0.85rem;
      cursor: pointer;
    }
    .status-select:focus { border-color: var(--gold); }
    .no-data { padding: 40px; text-align: center; color: var(--text-muted); }
  `]
})
export class ManageOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(orders => this.orders = orders);
  }

  updateStatus(orderId: string, status: string) {
    this.orderService.updateOrderStatus(orderId, status).subscribe(updated => {
      const index = this.orders.findIndex(o => o._id === orderId);
      if (index !== -1) this.orders[index].status = status;
    });
  }
}
