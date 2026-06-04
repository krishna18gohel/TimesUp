import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-page">
      <div class="page-header">
        <div class="container">
          <h1 class="section-title">About <span class="gold-text">TimesUp</span></h1>
          <p class="section-subtitle">Crafting moments of luxury since 2020</p>
        </div>
      </div>

      <div class="container">
        <section class="story-section">
          <div class="story-grid">
            <div class="story-content">
              <h2>Our <span class="gold-text">Story</span></h2>
              <p>Founded in 2020, TimesUp was born from a passion for horology and a vision to make luxury timepieces accessible to discerning collectors worldwide. Our journey began in a small workshop, where meticulous craftsmanship met bold innovation.</p>
              <p>Today, we curate the finest watches from renowned brands and our own exclusive line, ensuring every timepiece that bears our name meets the highest standards of precision and elegance.</p>
            </div>
            <div class="story-image">
              <img src="https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=600" alt="Our Story">
            </div>
          </div>
        </section>

        <section class="values-section">
          <h2 class="section-title">Our <span class="gold-text">Values</span></h2>
          <div class="values-grid">
            <div class="value-card" *ngFor="let v of values">
              <span class="value-icon">{{ v.icon }}</span>
              <h3>{{ v.title }}</h3>
              <p>{{ v.desc }}</p>
            </div>
          </div>
        </section>

        <section class="team-section">
          <h2 class="section-title">Meet the <span class="gold-text">Team</span></h2>
          <p class="section-subtitle">The minds behind TimesUp</p>
          <div class="team-grid">
            <div class="team-card" *ngFor="let m of team">
              <div class="team-avatar">{{ m.initials }}</div>
              <h3>{{ m.name }}</h3>
              <span class="team-role">{{ m.role }}</span>
            </div>
          </div>
        </section>

        <section class="stats-section">
          <div class="stats-grid">
            <div class="stat" *ngFor="let s of stats">
              <span class="stat-number">{{ s.number }}</span>
              <span class="stat-label">{{ s.label }}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .about-page { padding-top: 40px; }
    .page-header { padding: 60px 0 40px; }
    .story-section { padding: 40px 0 80px; }
    .story-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }
    .story-content h2 { font-family: var(--font-heading); font-size: 2rem; margin-bottom: 24px; }
    .story-content p { color: var(--text-secondary); line-height: 1.8; margin-bottom: 16px; font-size: 1rem; }
    .story-image { border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border); }
    .story-image img { width: 100%; height: 400px; object-fit: cover; }
    .values-section { padding: 80px 0; }
    .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-top: 48px; }
    .value-card {
      text-align: center;
      padding: 48px 32px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      transition: var(--transition);
    }
    .value-card:hover { border-color: var(--gold); transform: translateY(-4px); }
    .value-icon { font-size: 2.5rem; display: block; margin-bottom: 20px; }
    .value-card h3 { font-family: var(--font-heading); margin-bottom: 12px; }
    .value-card p { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; }
    .team-section { padding: 80px 0; }
    .team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
    .team-card {
      text-align: center;
      padding: 40px 24px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      transition: var(--transition);
    }
    .team-card:hover { border-color: var(--gold); }
    .team-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--gold), var(--gold-dark));
      color: #000;
      font-size: 1.5rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
    }
    .team-card h3 { font-family: var(--font-heading); margin-bottom: 4px; font-size: 1.1rem; }
    .team-role { color: var(--gold); font-size: 0.85rem; }
    .stats-section { padding: 80px 0; }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 32px;
      text-align: center;
    }
    .stat {
      padding: 40px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
    }
    .stat-number { display: block; font-size: 2.5rem; font-weight: 700; color: var(--gold); font-family: var(--font-heading); }
    .stat-label { color: var(--text-secondary); font-size: 0.9rem; margin-top: 8px; display: block; }
    @media (max-width: 768px) {
      .story-grid { grid-template-columns: 1fr; }
      .values-grid, .team-grid, .stats-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 480px) {
      .values-grid, .team-grid, .stats-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class AboutComponent {
  values = [
    { icon: '💎', title: 'Excellence', desc: 'We pursue perfection in every timepiece we curate and sell.' },
    { icon: '🤝', title: 'Trust', desc: 'Authenticity guaranteed on every watch we sell.' },
    { icon: '🌍', title: 'Sustainability', desc: 'Committed to ethical sourcing and sustainable practices.' }
  ];
  team = [
    { name: 'Krishna Gohel', role: 'Founder & CEO', initials: 'KG' },
    { name: 'Kartik Rana', role: 'Creative Director', initials: 'KR' },
    { name: 'Hevil Chaudhari', role: 'Head of Horology', initials: 'HC' },
    { name: 'Dhruv patel', role: 'Customer Experience', initials: 'DP' }
  ];
  stats = [
    { number: '5,000+', label: 'Happy Customers' },
    { number: '200+', label: 'Watch Models' },
    { number: '50+', label: 'Brand Partners' },
    { number: '6', label: 'Years of Excellence' }
  ];
}
