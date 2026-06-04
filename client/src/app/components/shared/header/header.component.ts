import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container header-content">
        <a routerLink="/" class="logo">
          <span class="logo-icon">⌚</span>
          <span class="logo-text">Times<span class="gold-text">Up</span></span>
        </a>

        <nav class="nav" [class.active]="mobileMenuOpen">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeMobile()">Home</a>
          <a routerLink="/watches" routerLinkActive="active" (click)="closeMobile()">Watches</a>
          <a routerLink="/about" routerLinkActive="active" (click)="closeMobile()">About</a>
          <a routerLink="/contact" routerLinkActive="active" (click)="closeMobile()">Contact</a>
        </nav>

        <div class="header-actions">
          <a routerLink="/cart" class="cart-icon" id="header-cart">
            🛒
            <span class="cart-badge" *ngIf="cartCount > 0">{{ cartCount }}</span>
          </a>

          <div class="user-menu" *ngIf="authService.isLoggedIn(); else loginBtn">
            <button class="user-btn" (click)="toggleUserMenu()" id="header-user-menu">
              {{ authService.currentUser?.name?.charAt(0)?.toUpperCase() }}
            </button>
            <div class="dropdown" *ngIf="userMenuOpen">
              <div class="dropdown-header">
                <strong>{{ authService.currentUser?.name }}</strong>
                <span>{{ authService.currentUser?.email }}</span>
              </div>
              <a routerLink="/profile" (click)="closeUserMenu()">👤 Profile</a>
              <a href="http://localhost:4201" *ngIf="authService.isAdmin()" (click)="closeUserMenu()">⚙️ Admin Panel</a>
              <button (click)="logout()" class="dropdown-logout">🚪 Logout</button>
            </div>
          </div>
          <ng-template #loginBtn>
            <a routerLink="/login" class="btn btn-primary btn-sm" id="header-login">Login</a>
          </ng-template>

          <button class="hamburger" (click)="toggleMobile()" id="header-hamburger">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: rgba(10, 10, 10, 0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      padding: 0 0;
    }
    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 72px;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: var(--font-heading);
      font-size: 1.6rem;
      font-weight: 700;
      letter-spacing: 1px;
    }
    .logo:hover { color: var(--text-primary); }
    .logo-icon { font-size: 1.8rem; }
    .nav {
      display: flex;
      gap: 36px;
    }
    .nav a {
      font-size: 0.95rem;
      font-weight: 500;
      color: var(--text-secondary);
      position: relative;
      padding: 4px 0;
    }
    .nav a::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--gold);
      transition: width 0.3s ease;
    }
    .nav a:hover, .nav a.active {
      color: var(--gold);
    }
    .nav a:hover::after, .nav a.active::after {
      width: 100%;
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .cart-icon {
      position: relative;
      font-size: 1.3rem;
      padding: 8px;
    }
    .cart-badge {
      position: absolute;
      top: 0;
      right: 0;
      background: var(--gold);
      color: #000;
      font-size: 0.65rem;
      font-weight: 700;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .user-menu { position: relative; }
    .user-btn {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--gold), var(--gold-dark));
      color: #000;
      font-weight: 700;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
    }
    .user-btn:hover { transform: scale(1.05); }
    .dropdown {
      position: absolute;
      top: 48px;
      right: 0;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      min-width: 220px;
      padding: 8px 0;
      box-shadow: 0 16px 48px rgba(0,0,0,0.5);
      animation: fadeIn 0.2s ease;
    }
    .dropdown-header {
      padding: 12px 16px;
      border-bottom: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .dropdown-header span {
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    .dropdown a, .dropdown-logout {
      display: block;
      width: 100%;
      padding: 10px 16px;
      font-size: 0.9rem;
      color: var(--text-secondary);
      text-align: left;
      background: none;
      border: none;
      cursor: pointer;
    }
    .dropdown a:hover, .dropdown-logout:hover {
      background: var(--bg-hover);
      color: var(--gold);
    }
    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
    }
    .hamburger span {
      display: block;
      width: 24px;
      height: 2px;
      background: var(--text-primary);
      transition: var(--transition);
      border-radius: 2px;
    }
    @media (max-width: 768px) {
      .hamburger { display: flex; }
      .nav {
        display: none;
        position: absolute;
        top: 72px;
        left: 0;
        right: 0;
        background: var(--bg-secondary);
        flex-direction: column;
        padding: 24px;
        gap: 20px;
        border-bottom: 1px solid var(--border);
      }
      .nav.active { display: flex; }
    }
  `]
})
export class HeaderComponent {
  mobileMenuOpen = false;
  userMenuOpen = false;
  cartCount = 0;

  constructor(public authService: AuthService, private cartService: CartService) {
    this.cartService.cart$.subscribe(items => {
      this.cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
    });
  }

  toggleMobile() { this.mobileMenuOpen = !this.mobileMenuOpen; }
  closeMobile() { this.mobileMenuOpen = false; }
  toggleUserMenu() { this.userMenuOpen = !this.userMenuOpen; }
  closeUserMenu() { this.userMenuOpen = false; }
  logout() {
    this.authService.logout();
    this.closeUserMenu();
  }
}
