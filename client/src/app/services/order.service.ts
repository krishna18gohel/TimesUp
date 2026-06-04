import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
    private apiUrl = `${environment.apiUrl}/orders`;
    private adminUrl = `${environment.apiUrl}/admin`;

    constructor(private http: HttpClient) { }

    placeOrder(data: any): Observable<Order> {
        return this.http.post<Order>(this.apiUrl, data);
    }

    getMyOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.apiUrl}/my-orders`);
    }

    getAllOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiUrl);
    }

    updateOrderStatus(orderId: string, status: string): Observable<Order> {
        return this.http.put<Order>(`${this.apiUrl}/${orderId}/status`, { status });
    }

    getDashboard(): Observable<any> {
        return this.http.get(`${this.adminUrl}/dashboard`);
    }
}
