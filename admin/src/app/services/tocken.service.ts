import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TockenService {
    private apiUrl = `${environment.apiUrl}/admin/tockens`;

    constructor(private http: HttpClient) { }

    getTockens(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }
}
