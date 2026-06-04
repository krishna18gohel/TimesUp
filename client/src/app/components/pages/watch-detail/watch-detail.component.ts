import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-watch-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="detail-page" *ngIf="product">
      <div class="container">
        <a routerLink="/watches" class="back-link">← Back to Collection</a>
        <div class="detail-grid">
          <div class="detail-image">
            <img [src]="product.image" [alt]="product.name">
          </div>
          <div class="detail-info">
            <span class="detail-brand">{{ product.brand }}</span>
            <h1>{{ product.name }}</h1>
            <div class="detail-rating">
              <span class="stars">⭐ {{ product.rating }}</span>
              <span class="category-badge">{{ product.category }}</span>
            </div>
            <p class="detail-price">₹{{ product.price.toLocaleString() }}</p>
            <p class="detail-desc">{{ product.description }}</p>

            <div class="detail-features" *ngIf="product.features?.length">
              <h3>Key Features</h3>
              <ul>
                <li *ngFor="let f of product.features">✦ {{ f }}</li>
              </ul>
            </div>

            <div class="detail-stock">
              <span [class]="product.stock > 0 ? 'in-stock' : 'out-stock'">
                {{ product.stock > 0 ? '✓ In Stock (' + product.stock + ' available)' : '✗ Out of Stock' }}
              </span>
            </div>

            <div class="detail-actions">
              <div class="qty-control">
                <button (click)="quantity > 1 && quantity = quantity - 1">−</button>
                <span>{{ quantity }}</span>
                <button (click)="quantity = quantity + 1">+</button>
              </div>
              <button class="btn btn-primary" (click)="addToCart()" [disabled]="product.stock === 0" id="add-to-cart">
                Add to Cart — ₹{{ (product.price * quantity).toLocaleString() }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .detail-page { padding-top: 40px; }
    .back-link {
      display: inline-block;
      color: var(--text-secondary);
      margin-bottom: 32px;
      font-size: 0.9rem;
      padding-top: 40px;
    }
    .back-link:hover { color: var(--gold); }
    .detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: start;
    }
    .detail-image {
      border-radius: var(--radius-lg);
      overflow: hidden;
      border: 1px solid var(--border);
    }
    .detail-image img {
      width: 100%;
      height: 500px;
      object-fit: cover;
    }
    .detail-brand {
      color: var(--gold);
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .detail-info h1 {
      font-family: var(--font-heading);
      font-size: 2.5rem;
      margin: 12px 0 16px;
    }
    .detail-rating {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }
    .stars { font-size: 1rem; }
    .category-badge {
      background: var(--bg-hover);
      padding: 4px 14px;
      border-radius: 20px;
      font-size: 0.8rem;
      text-transform: capitalize;
      border: 1px solid var(--border);
    }
    .detail-price {
      font-size: 2rem;
      font-weight: 700;
      color: var(--gold);
      margin-bottom: 24px;
    }
    .detail-desc {
      color: var(--text-secondary);
      line-height: 1.8;
      margin-bottom: 32px;
      font-size: 1rem;
    }
    .detail-features h3 {
      font-family: var(--font-heading);
      margin-bottom: 16px;
      font-size: 1.2rem;
    }
    .detail-features ul {
      list-style: none;
      padding: 0;
      margin-bottom: 24px;
    }
    .detail-features li {
      color: var(--text-secondary);
      padding: 8px 0;
      border-bottom: 1px solid var(--border);
      font-size: 0.95rem;
    }
    .detail-stock { margin-bottom: 32px; }
    .in-stock { color: var(--success); font-weight: 600; }
    .out-stock { color: var(--danger); font-weight: 600; }
    .detail-actions { display: flex; gap: 16px; align-items: center; }
    .qty-control {
      display: flex;
      align-items: center;
      gap: 0;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      overflow: hidden;
    }
    .qty-control button {
      width: 44px;
      height: 44px;
      background: var(--bg-card);
      border: none;
      color: var(--text-primary);
      font-size: 1.2rem;
      cursor: pointer;
    }
    .qty-control button:hover { background: var(--bg-hover); }
    .qty-control span {
      width: 50px;
      text-align: center;
      font-weight: 600;
    }
    .detail-actions .btn { flex: 1; padding: 14px; }
    @media (max-width: 768px) {
      .detail-grid { grid-template-columns: 1fr; gap: 32px; }
      .detail-info h1 { font-size: 1.8rem; }
      .detail-image img { height: 350px; }
    }
  `]
})
export class WatchDetailComponent implements OnInit {
  product: Product | null = null;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productService.getProduct(params['id']).subscribe(product => {
        this.product = product;
      });
    });
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
    }
  }
}
