import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-layout">
      <aside class="admin-sidebar">
        <div class="sidebar-header">
          <h2>⌚ Times<span class="gold-text">Up</span></h2>
          <span class="admin-tag">Admin Panel</span>
        </div>
        <nav class="sidebar-nav">
          <a routerLink="/dashboard" routerLinkActive="active">📊 Dashboard</a>
          <a routerLink="/products" routerLinkActive="active">📦 Products</a>
          <a routerLink="/orders" routerLinkActive="active">🛍️ Orders</a>
          <a routerLink="/tockens" routerLinkActive="active">📨 Tokens</a>
        </nav>
        <div class="sidebar-footer">
          <a href="http://localhost:4200" class="back-to-site">🌐 View Site</a>
          <button (click)="logout()" class="logout-btn">🚪 Logout</button>
        </div>
      </aside>
      <main class="admin-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .admin-layout { display: flex; min-height: 100vh; }
    .admin-sidebar {
      width: 260px;
      background: var(--bg-secondary);
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 100;
    }
    .sidebar-header {
      padding: 24px;
      border-bottom: 1px solid var(--border);
    }
    .sidebar-header h2 { font-family: var(--font-heading); font-size: 1.4rem; }
    .admin-tag {
      display: inline-block;
      background: var(--bg-hover);
      color: var(--gold);
      padding: 2px 10px;
      border-radius: 12px;
      font-size: 0.7rem;
      text-transform: uppercase;
      margin-top: 8px;
      font-weight: 600;
    }
    .sidebar-nav {
      flex: 1;
      padding: 16px 0;
    }
    .sidebar-nav a {
      display: block;
      padding: 14px 24px;
      color: var(--text-secondary);
      font-size: 0.95rem;
      border-left: 3px solid transparent;
      transition: var(--transition);
    }
    .sidebar-nav a:hover, .sidebar-nav a.active {
      background: var(--bg-hover);
      color: var(--gold);
      border-left-color: var(--gold);
    }
    .sidebar-footer {
      padding: 16px 24px;
      border-top: 1px solid var(--border);
    }
    .back-to-site, .logout-btn {
      display: block;
      width: 100%;
      padding: 10px;
      color: var(--text-secondary);
      font-size: 0.9rem;
      text-align: left;
      background: none;
      border: none;
      cursor: pointer;
      margin-bottom: 4px;
    }
    .back-to-site:hover, .logout-btn:hover { color: var(--gold); }
    .admin-main {
      flex: 1;
      margin-left: 260px;
      padding: 32px;
      min-height: 100vh;
      background: var(--bg-primary);
    }
    @media (max-width: 768px) {
      .admin-sidebar { width: 200px; }
      .admin-main { margin-left: 200px; padding: 20px; }
    }
  `]
})
export class AdminLayoutComponent {
  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
