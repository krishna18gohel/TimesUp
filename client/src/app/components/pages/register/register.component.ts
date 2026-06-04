import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-header">
          <h1>Create <span class="gold-text">Account</span></h1>
          <p>Join the TimesUp community</p>
        </div>
        <form (ngSubmit)="onRegister()" class="auth-form">
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" [(ngModel)]="name" name="name" placeholder="Your full name" required id="register-name">
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" [(ngModel)]="email" name="email" placeholder="your@email.com" required id="register-email">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" [(ngModel)]="password" name="password" placeholder="Min 6 characters" required id="register-password">
          </div>
          <div class="error-msg" *ngIf="error">{{ error }}</div>
          <button type="submit" class="btn btn-primary full-width" id="register-submit">Create Account</button>
        </form>
        <p class="auth-footer">Already have an account? <a routerLink="/login">Sign in</a></p>
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
  `]
})
export class RegisterComponent {
    name = '';
    email = '';
    password = '';
    error = '';

    constructor(private authService: AuthService, private router: Router) { }

    onRegister() {
        this.error = '';
        if (this.password.length < 6) {
            this.error = 'Password must be at least 6 characters';
            return;
        }
        this.authService.register({ name: this.name, email: this.email, password: this.password }).subscribe({
            next: () => this.router.navigate(['/']),
            error: (err) => {
                this.error = err.error?.message || 'Registration failed. Please try again.';
            }
        });
    }
}
