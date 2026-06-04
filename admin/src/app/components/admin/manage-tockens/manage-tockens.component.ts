import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TockenService } from '../../../services/tocken.service';

@Component({
    selector: 'app-manage-tockens',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="manage-page">
      <div class="page-header">
        <h2>Manage <span class="gold-text">Tokens</span></h2>
        <p>View and manage all user contact tokens</p>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let tocken of tockens">
              <td class="id-col">#{{ tocken._id.substring(tocken._id.length - 6) }}</td>
              <td>{{ tocken.name }}</td>
              <td>{{ tocken.email }}</td>
              <td>{{ tocken.subject || 'No Subject' }}</td>
              <td>
                <div class="message-cell" [title]="tocken.message">
                  {{ tocken.message }}
                </div>
              </td>
              <td class="date-col">{{ tocken.createdAt | date:'mediumDate' }}</td>
            </tr>
            <tr *ngIf="tockens.length === 0">
              <td colspan="6" class="empty-state">No tokens found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
    styles: [`
    .manage-page {
      animation: fadeIn var(--duration) ease-out;
    }
    .page-header {
      margin-bottom: 24px;
    }
    .page-header h2 {
      font-family: var(--font-heading);
      font-size: 1.8rem;
      margin-bottom: 8px;
    }
    .page-header p {
      color: var(--text-secondary);
      font-size: 0.95rem;
    }
    .table-container {
      background: var(--bg-card);
      border-radius: var(--radius);
      border: 1px solid var(--border);
      overflow-x: auto;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      min-width: 800px;
    }
    .data-table th, .data-table td {
      padding: 16px 20px;
      text-align: left;
      border-bottom: 1px solid var(--border);
      font-size: 0.95rem;
    }
    .data-table th {
      color: var(--text-secondary);
      font-weight: 500;
      background: rgba(0,0,0,0.2);
    }
    .id-col {
      color: var(--gold);
      font-family: monospace;
      font-size: 0.9rem !important;
    }
    .message-cell {
      max-width: 250px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: default;
    }
    .date-col {
      color: var(--text-secondary);
      font-size: 0.9rem !important;
    }
    .empty-state {
      text-align: center;
      padding: 40px !important;
      color: var(--text-secondary);
    }
  `]
})
export class ManageTockensComponent implements OnInit {
    tockens: any[] = [];

    constructor(private tockenService: TockenService) { }

    ngOnInit(): void {
        this.loadTockens();
    }

    loadTockens(): void {
        this.tockenService.getTockens().subscribe({
            next: (data) => {
                this.tockens = data;
            },
            error: (error) => {
                console.error('Error fetching tokens', error);
            }
        });
    }
}
