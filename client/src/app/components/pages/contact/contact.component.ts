import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="contact-page">
      <div class="page-header">
        <div class="container">
          <h1 class="section-title">Get in <span class="gold-text">Touch</span></h1>
          <p class="section-subtitle">We'd love to hear from you</p>
        </div>
      </div>
      <div class="container">
        <div class="contact-grid">
          <div class="contact-form-wrapper">
            <h2>Send us a <span class="gold-text">Message</span></h2>
            <form (ngSubmit)="onSubmit()" class="contact-form">
              <div class="form-row">
                <div class="form-group">
                  <label>Name</label>
                  <input type="text" [(ngModel)]="form.name" name="name" placeholder="Your name" required>
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input type="email" [(ngModel)]="form.email" name="email" placeholder="your@email.com" required>
                </div>
              </div>
              <div class="form-group">
                <label>Subject</label>
                <input type="text" [(ngModel)]="form.subject" name="subject" placeholder="How can we help?">
              </div>
              <div class="form-group">
                <label>Message</label>
                <textarea [(ngModel)]="form.message" name="message" rows="6" placeholder="Your message..." required></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Send Message</button>
            </form>
            <div class="success-msg" *ngIf="submitted">
              ✓ Thank you! Your message has been sent. We'll get back to you soon.
            </div>
          </div>
          <div class="contact-info">
            <div class="info-card" *ngFor="let info of contactInfo">
              <span class="info-icon">{{ info.icon }}</span>
              <h3>{{ info.title }}</h3>
              <p>{{ info.detail }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-page { padding-top: 40px; }
    .page-header { padding: 60px 0 40px; }
    .contact-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 60px; }
    .contact-form-wrapper h2 { font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 32px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .contact-form textarea { resize: vertical; }
    .success-msg {
      margin-top: 20px;
      padding: 16px;
      background: rgba(46,204,113,0.1);
      border: 1px solid var(--success);
      border-radius: var(--radius-sm);
      color: var(--success);
    }
    .contact-info { display: flex; flex-direction: column; gap: 20px; }
    .info-card {
      padding: 28px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      transition: var(--transition);
    }
    .info-card:hover { border-color: var(--gold); }
    .info-icon { font-size: 1.8rem; display: block; margin-bottom: 12px; }
    .info-card h3 { font-family: var(--font-heading); margin-bottom: 8px; font-size: 1.05rem; }
    .info-card p { color: var(--text-secondary); font-size: 0.9rem; }
    @media (max-width: 768px) {
      .contact-grid { grid-template-columns: 1fr; }
      .form-row { grid-template-columns: 1fr; }
    }
  `]
})
export class ContactComponent {
  form = { name: '', email: '', subject: '', message: '' };
  submitted = false;
  contactInfo = [
    { icon: '📞', title: 'Phone', detail: '+91 98765 43210' },
    { icon: '✉️', title: 'Email', detail: 'hello@timesup.com' },
    { icon: '🕐', title: 'Hours', detail: 'Mon - Sat: 9AM - 8PM IST' }
  ];

  constructor(private http: HttpClient) { }

  onSubmit() {
    this.http.post(`${environment.apiUrl}/tockens`, this.form).subscribe({
      next: (res) => {
        this.submitted = true;
        this.form = { name: '', email: '', subject: '', message: '' };
        setTimeout(() => this.submitted = false, 5000);
      },
      error: (err) => {
        console.error('Error sending message:', err);
        alert('Failed to send message. Please try again later.');
      }
    });
  }
}
