import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-header">
          <h1>Welcome <span class="gold-text">Back</span></h1>
          <p>Sign in to your TimesUp account</p>
        </div>
        <form (ngSubmit)="onLogin()" class="auth-form">
          <div class="form-group">
            <label>Email</label>
            <input type="email" [(ngModel)]="email" name="email" placeholder="your@email.com" required id="login-email">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" [(ngModel)]="password" name="password" placeholder="Enter your password" required id="login-password">
          </div>
          <div class="error-msg" *ngIf="error">{{ error }}</div>
          <button type="submit" class="btn btn-primary full-width" id="login-submit">Sign In</button>
        </form>
        <p class="auth-footer">Don't have an account? <a routerLink="/register">Create one</a></p>
        <div class="admin-link">
          <p>Staff member? <a href="http://localhost:4201/login">Admin Panel Access</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 120px 24px 60px;
    }
    .auth-card {
      width: 100%;
      max-width: 440px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 48px 40px;
    }
    .auth-header { text-align: center; margin-bottom: 36px; }
    .auth-header h1 { font-family: var(--font-heading); font-size: 2rem; margin-bottom: 8px; }
    .auth-header p { color: var(--text-secondary); }
    .full-width { width: 100%; }
    .error-msg {
      color: var(--danger);
      font-size: 0.85rem;
      margin-bottom: 16px;
      padding: 10px;
      background: rgba(231,76,60,0.1);
      border-radius: var(--radius-sm);
    }
    .auth-footer {
      text-align: center;
      margin-top: 24px;
      color: var(--text-secondary);
      font-size: 0.9rem;
    }
    .auth-footer a { color: var(--gold); font-weight: 600; }
    .admin-link {
        margin-top: 32px;
        padding-top: 24px;
        border-top: 1px solid var(--border);
        text-align: center;
    }
    .admin-link p { font-size: 0.85rem; color: var(--text-muted); margin: 0; }
    .admin-link a { color: var(--gold); font-weight: 600; margin-left: 4px; }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.error = '';
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Login failed. Please try again.';
      }
    });
  }
}
