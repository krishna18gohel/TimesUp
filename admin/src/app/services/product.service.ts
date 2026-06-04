import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private apiUrl = `${environment.apiUrl}/products`;

    constructor(private http: HttpClient) { }

    getProducts(params?: { category?: string; search?: string; sort?: string }): Observable<Product[]> {
        let httpParams = new HttpParams();
        if (params?.category) httpParams = httpParams.set('category', params.category);
        if (params?.search) httpParams = httpParams.set('search', params.search);
        if (params?.sort) httpParams = httpParams.set('sort', params.sort);
        return this.http.get<Product[]>(this.apiUrl, { params: httpParams });
    }

    getProduct(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }

    createProduct(data: any): Observable<Product> {
        return this.http.post<Product>(this.apiUrl, data);
    }

    updateProduct(id: string, data: any): Observable<Product> {
        return this.http.put<Product>(`${this.apiUrl}/${id}`, data);
    }

    deleteProduct(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
