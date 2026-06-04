import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-watches',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="watches-page">
      <div class="page-header">
        <div class="container hero-mini">
          <h1 class="section-title">The <span class="gold-text">Collection</span></h1>
          <p class="section-subtitle">Meticulously crafted timepieces for every occasion.</p>
        </div>
      </div>

      <div class="container">
        <!-- Horizontal Category Filter -->
        <div class="category-nav fade-in">
          <button 
            [class.active]="selectedCategory === ''" 
            (click)="setCategory('')"
            class="cat-chip">
            All Watches
          </button>
          <button 
            *ngFor="let cat of categories"
            [class.active]="selectedCategory === cat.slug" 
            (click)="setCategory(cat.slug)"
            class="cat-chip">
            <span class="chip-icon">{{ cat.icon }}</span>
            {{ cat.name }}
          </button>
        </div>

        <div class="filters-bar">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input type="text" placeholder="Search by name, brand or detail..." [(ngModel)]="searchTerm" (input)="filterProducts()" id="search-watches">
          </div>
          <div class="filter-group">
            <div class="select-wrapper">
              <select [(ngModel)]="selectedSort" (change)="filterProducts()" id="filter-sort">
                <option value="">Sort By: Default</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>

        <div class="results-info" *ngIf="!loading">
          <div class="count-badge">{{ products.length }} Results Found</div>
          <button class="clear-btn" *ngIf="selectedCategory || searchTerm || selectedSort" (click)="clearAllFilters()">
            ✕ Clear All Filters
          </button>
        </div>

        <!-- Products Grid -->
        <div class="product-grid" *ngIf="!loading && products.length > 0">
          <div class="product-card card" *ngFor="let p of products; let i = index" [style.animation-delay]="i * 0.05 + 's'">
            <div class="product-img-wrapper">
              <img [src]="p.image" [alt]="p.name" loading="lazy">
              <div class="product-badges">
                <span class="badge-cat">{{ p.category }}</span>
              </div>
              <div class="hover-actions">
                <button class="action-btn" (click)="addToCart(p)" title="Quick Add to Cart">
                  <span>Add to Cart</span>
                  <span class="icon">🛒</span>
                </button>
              </div>
            </div>
            <div class="product-details">
              <div class="top-row">
                <span class="brand">{{ p.brand }}</span>
                <span class="rating">⭐ {{ p.rating }}</span>
              </div>
              <h3>{{ p.name }}</h3>
              <p class="desc">{{ p.description | slice:0:70 }}...</p>
              <div class="bottom-row">
                <span class="price">₹{{ p.price.toLocaleString() }}</span>
                <a [routerLink]="['/watches', p._id]" class="view-link">View Details →</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div class="skeleton-grid" *ngIf="loading">
          <div class="skeleton-card" *ngFor="let i of [1,2,3,4,5,6,7,8]"></div>
        </div>

        <!-- No Results -->
        <div class="no-results-premium fade-in" *ngIf="products.length === 0 && !loading">
          <div class="empty-icon">⌚</div>
          <h3>No timepieces match your criteria</h3>
          <p>We couldn't find any watches matching your current filters. Try expanding your search or clearing all filters.</p>
          <button class="btn btn-primary" (click)="clearAllFilters()">Clear All Filters</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .watches-page { padding-bottom: 100px; }
    .hero-mini { text-align: center; padding: 100px 0 60px; }
    
    /* Category Chips */
    .category-nav {
      display: flex;
      gap: 12px;
      margin-bottom: 40px;
      overflow-x: auto;
      padding: 4px 4px 12px;
      scrollbar-width: none; /* Firefox */
    }
    .category-nav::-webkit-scrollbar { display: none; } /* Chrome/Safari */
    
    .cat-chip {
      white-space: nowrap;
      padding: 10px 24px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 50px;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .cat-chip:hover {
      border-color: var(--gold);
      color: var(--text-primary);
      transform: translateY(-2px);
    }
    .cat-chip.active {
      background: var(--gold);
      border-color: var(--gold);
      color: #000;
      box-shadow: 0 8px 20px rgba(201, 168, 76, 0.3);
    }
    .chip-icon { font-size: 1.1rem; }

    /* Filter Bar */
    .filters-bar {
      display: flex;
      gap: 20px;
      margin-bottom: 30px;
      align-items: center;
    }
    .search-box {
      flex: 1;
      position: relative;
    }
    .search-icon {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      font-size: 1rem;
    }
    .search-box input {
      width: 100%;
      padding: 14px 20px 14px 48px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      color: var(--text-primary);
      font-size: 0.95rem;
      transition: border-color 0.3s;
    }
    .search-box input:focus { border-color: var(--gold); outline: none; }
    
    .select-wrapper select {
      padding: 14px 24px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      color: var(--text-primary);
      font-size: 0.95rem;
      cursor: pointer;
      min-width: 200px;
    }
    .select-wrapper select:focus { border-color: var(--gold); outline: none; }

    .results-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    .count-badge {
      background: rgba(201, 168, 76, 0.1);
      color: var(--gold);
      padding: 6px 16px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
    }
    .clear-btn {
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 0.85rem;
      transition: color 0.3s;
    }
    .clear-btn:hover { color: var(--gold); }

    /* Product Cards */
    .product-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 30px;
    }
    .product-card {
      background: var(--bg-card);
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid var(--border);
      transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
      animation: fadeInUp 0.6s ease forwards;
      opacity: 0;
    }
    .product-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.4);
      border-color: rgba(201, 168, 76, 0.3);
    }
    .product-img-wrapper {
      position: relative;
      height: 280px;
      overflow: hidden;
      background: #111;
    }
    .product-img-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }
    .product-card:hover .product-img-wrapper img { transform: scale(1.1); }
    
    .product-badges {
      position: absolute;
      top: 16px;
      left: 16px;
    }
    .badge-cat {
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(8px);
      color: var(--gold);
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      border: 1px solid rgba(201, 168, 76, 0.3);
    }

    .hover-actions {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.4);
      display: flex;
      align-items: flex-end;
      padding: 20px;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .product-card:hover .hover-actions { opacity: 1; }
    
    .action-btn {
      width: 100%;
      padding: 12px;
      background: var(--gold);
      color: #000;
      border: none;
      border-radius: 8px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      cursor: pointer;
      transform: translateY(20px);
      transition: all 0.3s;
    }
    .product-card:hover .action-btn { transform: translateY(0); }
    .action-btn:hover { background: #dcb651; }

    .product-details { padding: 24px; }
    .top-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .brand { color: var(--gold); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; }
    .rating { font-size: 0.85rem; color: var(--text-secondary); }
    h3 { font-family: var(--font-heading); font-size: 1.25rem; margin-bottom: 12px; color: var(--text-primary); }
    .desc { color: var(--text-muted); font-size: 0.85rem; line-height: 1.6; margin-bottom: 20px; }
    .bottom-row { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid var(--border); }
    .price { font-size: 1.3rem; font-weight: 800; color: var(--text-primary); }
    .view-link { font-size: 0.85rem; font-weight: 600; color: var(--gold); text-decoration: none; transition: transform 0.3s; }
    .view-link:hover { transform: translateX(5px); }

    /* Skeleton Loading */
    .skeleton-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; }
    .skeleton-card { height: 400px; background: var(--bg-card); border-radius: 16px; animation: pulse 1.5s infinite; }
    @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 0.3; } 100% { opacity: 0.6; } }

    .no-results-premium { text-align: center; padding: 100px 0; max-width: 500px; margin: 0 auto; }
    .empty-icon { font-size: 4rem; margin-bottom: 20px; opacity: 0.3; }
    .no-results-premium h3 { font-size: 1.8rem; margin-bottom: 16px; }
    .no-results-premium p { color: var(--text-secondary); margin-bottom: 32px; line-height: 1.7; }

    @media (max-width: 1200px) { .product-grid { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 900px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 600px) { 
      .product-grid { grid-template-columns: 1fr; }
      .filters-bar { flex-direction: column; }
      .select-wrapper select { width: 100%; }
    }
  `]
})
export class WatchesComponent implements OnInit {
  products: Product[] = [];
  categories = [
    { name: 'Luxury', slug: 'luxury', icon: '💎' },
    { name: 'Sport', slug: 'sport', icon: '🏃' },
    { name: 'Classic', slug: 'classic', icon: '🎩' },
    { name: 'Dive', slug: 'dive', icon: '🌊' },
    { name: 'Smart', slug: 'smart', icon: '📱' },
    { name: 'Casual', slug: 'casual', icon: '☀️' }
  ];

  searchTerm = '';
  selectedCategory = '';
  selectedSort = '';
  loading = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['category']) this.selectedCategory = params['category'];
      this.filterProducts();
    });
  }

  setCategory(slug: string) {
    this.selectedCategory = slug;
    this.filterProducts();
  }

  filterProducts() {
    this.loading = true;
    const params: any = { limit: 100 }; // Increased limit to ensure "all" products are seen
    if (this.selectedCategory) params.category = this.selectedCategory;
    if (this.searchTerm) params.search = this.searchTerm;
    if (this.selectedSort) params.sort = this.selectedSort;

    this.productService.getProducts(params).subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  clearAllFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedSort = '';
    this.filterProducts();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
