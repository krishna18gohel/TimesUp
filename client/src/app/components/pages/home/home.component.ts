import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <div class="hero-text-box">
          <span class="hero-tag fade-in-up">✦ Luxury Timepieces</span>
          <h1 class="fade-in-up">Where Time Meets <span class="gold-text">Elegance</span></h1>
          <p class="fade-in-up">Explore a world where precision engineering meets high-end fashion. Discover our latest collection of premium watches.</p>
          <div class="hero-btns fade-in-up">
            <a routerLink="/watches" class="btn btn-primary btn-lg">Shop Now</a>
            <a routerLink="/watches" [queryParams]="{category: 'luxury'}" class="btn btn-outline btn-lg">Luxury Collection</a>
          </div>
        </div>
      </div>
    </section>

    <section class="featured-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">New <span class="gold-text">Arrivals</span></h2>
          <p class="section-subtitle">The latest additions to our prestigious catalog</p>
        </div>
        
        <div class="product-grid">
          <div class="product-card card" *ngFor="let p of featuredProducts; let i = index" [style.animation-delay]="i * 0.05 + 's'">
            <div class="product-img">
              <img [src]="p.image" [alt]="p.name" loading="lazy">
              <span class="product-category-tag">{{ p.category }}</span>
              <div class="card-overlay">
                 <a [routerLink]="['/watches', p._id]" class="view-btn">View Timepiece</a>
              </div>
            </div>
            <div class="product-info">
              <span class="product-brand">{{ p.brand }}</span>
              <h3>{{ p.name }}</h3>
              <div class="product-meta">
                <span class="product-price">₹{{ p.price.toLocaleString() }}</span>
                <span class="product-rating">⭐ {{ p.rating }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="center-btn">
          <a routerLink="/watches" class="btn btn-primary btn-lg">View Entire Collection</a>
        </div>
      </div>
    </section>

    <section class="features-section">
      <div class="container">
        <div class="features-grid">
          <div class="feature-card" *ngFor="let f of features">
            <span class="feature-icon">{{ f.icon }}</span>
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      height: 100vh;
      display: flex;
      align-items: center;
      background: url('https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1600') center/cover no-repeat;
    }
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.4));
    }
    .hero-content { position: relative; z-index: 10; width: 100%; }
    .hero-text-box { max-width: 650px; }
    .hero-tag { font-size: 0.9rem; letter-spacing: 4px; color: var(--gold); text-transform: uppercase; margin-bottom: 24px; display: block; font-weight: 700; }
    .hero h1 { font-size: 5rem; line-height: 1.1; margin-bottom: 24px; font-family: var(--font-heading); }
    .hero p { font-size: 1.25rem; color: var(--text-secondary); margin-bottom: 40px; line-height: 1.6; }
    .hero-btns { display: flex; gap: 20px; }
    
    .btn-lg { padding: 16px 36px; font-size: 1rem; }
    .btn-outline { border: 2px solid var(--gold); background: transparent; color: var(--gold); }
    .btn-outline:hover { background: var(--gold); color: #000; }


    .featured-section { padding: 120px 0; }
    .section-header { text-align: center; margin-bottom: 60px; }
    
    .product-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 32px;
      margin-bottom: 60px;
    }
    .product-card {
      background: var(--bg-card);
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--border);
      transition: transform 0.3s;
    }
    .product-card:hover { transform: translateY(-10px); }
    
    .product-img { position: relative; height: 320px; overflow: hidden; }
    .product-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
    .product-card:hover .product-img img { transform: scale(1.1); }
    
    .product-category-tag {
      position: absolute;
      top: 16px; left: 16px;
      background: rgba(201, 168, 76, 0.9);
      color: #000;
      padding: 4px 10px;
      font-size: 0.7rem;
      font-weight: 700;
      border-radius: 4px;
      text-transform: uppercase;
    }
    
    .card-overlay {
       position: absolute; inset: 0;
       background: rgba(0,0,0,0.5);
       display: flex; align-items: center; justify-content: center;
       opacity: 0; transition: opacity 0.3s;
    }
    .product-card:hover .card-overlay { opacity: 1; }
    .view-btn { padding: 12px 24px; background: #fff; color: #000; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 0.9rem; }

    .product-info { padding: 24px; }
    .product-brand { color: var(--gold); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; }
    .product-info h3 { margin: 10px 0; font-size: 1.2rem; font-family: var(--font-heading); }
    .product-meta { display: flex; justify-content: space-between; align-items: center; }
    .product-price { font-size: 1.1rem; font-weight: 700; }
    .product-rating { font-size: 0.85rem; color: var(--text-muted); }

    .features-section { padding: 80px 0; }
    .features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
    .feature-card {
      text-align: center; padding: 40px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 16px;
    }
    .feature-icon { font-size: 2.5rem; display: block; margin-bottom: 16px; }
    .feature-card h3 { font-family: var(--font-heading); margin-bottom: 8px; }
    .feature-card p { color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; }

    @media (max-width: 1024px) {
      .hero h1 { font-size: 3.5rem; }
      .product-grid { grid-template-columns: repeat(2, 1fr); }
      .features-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 600px) {
      .hero h1 { font-size: 2.5rem; }
      .product-grid { grid-template-columns: 1fr; }
      .features-grid { grid-template-columns: 1fr; }
      .hero-btns { flex-direction: column; }
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  features = [
    { icon: '🔒', title: 'Secure Payment', desc: '100% secure payment methods for your safety' },
    { icon: '🚚', title: 'Global Origin', desc: 'Direct shipping from worldwide manufacturers' },
    { icon: '🔄', title: 'Easy Returns', desc: 'No-questions-asked 30-day return policy' },
    { icon: '🛡️', title: 'Trusted Warranty', desc: 'Reliable 2-year international warranty' }
  ];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    // Fetch 8 products for the home page arrivals
    this.productService.getProducts({ limit: 8 }).subscribe(products => {
      this.featuredProducts = products;
    });
  }
}
