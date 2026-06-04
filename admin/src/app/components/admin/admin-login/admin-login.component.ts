import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="admin-login-page">
      <div class="admin-login-card">
        <div class="admin-logo">⚙️</div>
        <h1>Admin <span class="gold-text">Panel</span></h1>
        <p>Enter your admin credentials</p>
        <form (ngSubmit)="onLogin()">
          <div class="form-group">
            <label>Email</label>
            <input type="email" [(ngModel)]="email" name="email" placeholder="admin@timesup.com" required>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required>
          </div>
          <div class="error-msg" *ngIf="error">{{ error }}</div>
          <button type="submit" class="btn btn-primary full-width">Sign In as Admin</button>
        </form>
        <p class="back-link"><a href="http://localhost:4200/login">← Back to User Login</a></p>
      </div>
    </div>
  `,
  styles: [`
    .admin-login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
      padding: 24px;
    }
    .admin-login-card {
      width: 100%;
      max-width: 420px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 48px 40px;
      text-align: center;
    }
    .admin-logo { font-size: 3rem; margin-bottom: 16px; }
    h1 { font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 8px; }
    p { color: var(--text-secondary); margin-bottom: 32px; }
    .full-width { width: 100%; }
    .error-msg {
      color: var(--danger);
      font-size: 0.85rem;
      margin-bottom: 16px;
      padding: 10px;
      background: rgba(231,76,60,0.1);
      border-radius: var(--radius-sm);
      text-align: left;
    }
    .back-link { margin-top: 20px; }
    .back-link a { color: var(--gold); font-size: 0.9rem; }
  `]
})
export class AdminLoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.error = '';
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        if (res.user.role === 'admin') {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'This account does not have admin privileges.';
          this.authService.logout();
        }
      },
      error: (err) => {
        this.error = err.error?.message || 'Login failed.';
      }
    });
  }
}
