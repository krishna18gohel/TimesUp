import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header *ngIf="!isAdminPage"></app-header>
    <main [class.with-header]="!isAdminPage">
      <router-outlet></router-outlet>
    </main>
    <app-footer *ngIf="!isAdminPage"></app-footer>
  `,
  styles: [`
    .with-header {
      padding-top: 72px;
    }
  `]
})
export class App {
  isAdminPage = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isAdminPage = event.url.startsWith('/admin') && !event.url.includes('/admin/login');
    });
  }
}
