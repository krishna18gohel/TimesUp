import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [RouterModule],
    template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <h3 class="footer-logo">⌚ Times<span class="gold-text">Up</span></h3>
            <p>Crafting moments of luxury since 2020. Every timepiece tells a story of precision, elegance, and timeless design.</p>
          </div>
          <div class="footer-links">
            <h4>Quick Links</h4>
            <a routerLink="/">Home</a>
            <a routerLink="/watches">Watches</a>
            <a routerLink="/about">About Us</a>
            <a routerLink="/contact">Contact</a>
          </div>
          <div class="footer-links">
            <h4>Categories</h4>
            <a routerLink="/watches" [queryParams]="{category: 'luxury'}">Luxury</a>
            <a routerLink="/watches" [queryParams]="{category: 'sport'}">Sport</a>
            <a routerLink="/watches" [queryParams]="{category: 'classic'}">Classic</a>
            <a routerLink="/watches" [queryParams]="{category: 'dive'}">Dive</a>
          </div>
          <div class="footer-links">
            <h4>Contact</h4>
            <p>📍 123 Luxury Lane, NY 10001</p>
            <p>📞 +1 (555) 123-4567</p>
            <p>✉️ hello&#64;timesup.com</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 TimesUp. All Rights Reserved.</p>
          <div class="social-links">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Twitter">🐦</a>
          </div>
        </div>
      </div>
    </footer>
  `,
    styles: [`
    .footer {
      background: var(--bg-secondary);
      border-top: 1px solid var(--border);
      padding: 64px 0 0;
      margin-top: 80px;
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 48px;
      padding-bottom: 48px;
      border-bottom: 1px solid var(--border);
    }
    .footer-logo {
      font-family: var(--font-heading);
      font-size: 1.5rem;
      margin-bottom: 16px;
    }
    .footer-brand p {
      color: var(--text-secondary);
      font-size: 0.9rem;
      line-height: 1.7;
    }
    .footer-links h4 {
      font-family: var(--font-heading);
      margin-bottom: 20px;
      color: var(--gold);
      font-size: 1.1rem;
    }
    .footer-links a, .footer-links p {
      display: block;
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin-bottom: 12px;
    }
    .footer-links a:hover { color: var(--gold); }
    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 0;
      color: var(--text-muted);
      font-size: 0.85rem;
    }
    .social-links {
      display: flex;
      gap: 16px;
    }
    .social-links a {
      font-size: 1.2rem;
      transition: var(--transition);
    }
    .social-links a:hover { transform: translateY(-3px); }
    @media (max-width: 768px) {
      .footer-grid {
        grid-template-columns: 1fr 1fr;
        gap: 32px;
      }
      .footer-bottom {
        flex-direction: column;
        gap: 12px;
        text-align: center;
      }
    }
    @media (max-width: 480px) {
      .footer-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class FooterComponent { }
