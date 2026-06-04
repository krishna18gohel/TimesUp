import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="manage-products">
      <div class="page-top">
        <h1>Manage Products</h1>
        <button class="btn btn-primary btn-sm" (click)="openModal()">+ Add Product</button>
      </div>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of products">
              <td><img [src]="p.image" class="table-img" [alt]="p.name"></td>
              <td class="name-cell">{{ p.name }}</td>
              <td>{{ p.brand }}</td>
              <td class="price-cell">₹{{ p.price.toLocaleString() }}</td>
              <td><span class="category-tag">{{ p.category }}</span></td>
              <td>{{ p.stock }}</td>
              <td class="actions-cell">
                <button class="btn btn-secondary btn-sm" (click)="editProduct(p)">Edit</button>
                <button class="btn btn-danger btn-sm" (click)="deleteProduct(p._id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="no-data" *ngIf="products.length === 0">No products found.</p>
      </div>

      <!-- Modal -->
      <div class="modal-overlay" *ngIf="showModal" (click)="closeModal()">
        <div class="modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>{{ editing ? 'Edit' : 'Add' }} Product</h2>
            <button class="close-btn" (click)="closeModal()">✕</button>
          </div>
          <form (ngSubmit)="saveProduct()">
            <div class="form-row">
              <div class="form-group">
                <label>Name</label>
                <input type="text" [(ngModel)]="form.name" name="name" required>
              </div>
              <div class="form-group">
                <label>Brand</label>
                <input type="text" [(ngModel)]="form.brand" name="brand" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Price</label>
                <input type="number" [(ngModel)]="form.price" name="price" required>
              </div>
              <div class="form-group">
                <label>Stock</label>
                <input type="number" [(ngModel)]="form.stock" name="stock">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Category</label>
                <select [(ngModel)]="form.category" name="category">
                  <option value="luxury">Luxury</option>
                  <option value="sport">Sport</option>
                  <option value="classic">Classic</option>
                  <option value="dive">Dive</option>
                  <option value="smart">Smart</option>
                  <option value="casual">Casual</option>
                </select>
              </div>
              <div class="form-group">
                <label>Rating</label>
                <input type="number" [(ngModel)]="form.rating" name="rating" min="0" max="5" step="0.1">
              </div>
            </div>
            <div class="form-group">
              <label>Product Image</label>
              <div class="image-upload-wrapper">
                <input type="file" (change)="onFileSelected($event)" accept="image/*" class="file-input" id="imageUpload">
                <label for="imageUpload" class="file-label">
                  <span *ngIf="!form.image">📁 Click to upload image</span>
                  <div *ngIf="form.image" class="preview-container">
                    <img [src]="form.image" class="form-preview">
                    <span>Change Image</span>
                  </div>
                </label>
              </div>
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea [(ngModel)]="form.description" name="description" rows="4" required></textarea>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn btn-secondary btn-sm" (click)="closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary btn-sm">{{ editing ? 'Update' : 'Create' }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .manage-products h1 { font-family: var(--font-heading); font-size: 2rem; }
    .page-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
    .table-wrapper {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      overflow-x: auto;
    }
    table { width: 100%; border-collapse: collapse; }
    th {
      text-align: left;
      padding: 14px 16px;
      background: var(--bg-hover);
      color: var(--text-secondary);
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
    }
    td { padding: 12px 16px; border-top: 1px solid var(--border); font-size: 0.9rem; vertical-align: middle; }
    .table-img { width: 50px; height: 50px; object-fit: cover; border-radius: 8px; }
    .name-cell { font-weight: 600; }
    .price-cell { color: var(--gold); font-weight: 600; }
    .category-tag {
      background: var(--bg-hover);
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 0.75rem;
      text-transform: capitalize;
    }
    .actions-cell { display: flex; gap: 8px; }
    .no-data { padding: 40px; text-align: center; color: var(--text-muted); }
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 24px;
    }
    .modal {
      width: 100%;
      max-width: 600px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 32px;
      max-height: 85vh;
      overflow-y: auto;
    }
    .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .modal-header h2 { font-family: var(--font-heading); font-size: 1.4rem; }
    .close-btn { background: none; border: none; color: var(--text-muted); font-size: 1.3rem; cursor: pointer; }
    .close-btn:hover { color: var(--text-primary); }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; }

    .image-upload-wrapper {
      position: relative;
      margin-top: 8px;
    }
    .file-input {
      display: none;
    }
    .file-label {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      border: 2px dashed var(--border);
      border-radius: var(--radius);
      cursor: pointer;
      transition: var(--transition);
      background: var(--bg-hover);
      min-height: 120px;
    }
    .file-label:hover {
      border-color: var(--gold);
      background: rgba(201, 168, 76, 0.05);
    }
    .preview-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .form-preview {
      width: 120px;
      height: 120px;
      object-fit: cover;
      border-radius: 8px;
      border: 2px solid var(--gold);
    }
    .preview-container span {
      font-size: 0.8rem;
      color: var(--gold);
      font-weight: 600;
    }
  `]
})
export class ManageProductsComponent implements OnInit {
  products: Product[] = [];
  showModal = false;
  editing = false;
  editingId = '';
  form: any = this.getEmptyForm();

  constructor(private productService: ProductService) { }

  ngOnInit() { this.loadProducts(); }

  loadProducts() {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  getEmptyForm() {
    return { name: '', brand: 'TimesUp', price: 0, description: '', image: '', category: 'luxury', stock: 10, rating: 4.0 };
  }

  openModal() {
    this.form = this.getEmptyForm();
    this.editing = false;
    this.showModal = true;
  }

  editProduct(p: Product) {
    this.form = { ...p };
    this.editingId = p._id;
    this.editing = true;
    this.showModal = true;
  }

  closeModal() { this.showModal = false; }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.form.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProduct() {
    if (this.editing) {
      this.productService.updateProduct(this.editingId, this.form).subscribe(() => {
        this.loadProducts();
        this.closeModal();
      });
    } else {
      this.productService.createProduct(this.form).subscribe(() => {
        this.loadProducts();
        this.closeModal();
      });
    }
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
    }
  }
}
