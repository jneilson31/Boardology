import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Product } from '../../_models/product.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class SearchService {
    baseUrl = environment.apiUrl;
    url = `${this.baseUrl}/games/search?search=`;

    constructor(private http: HttpClient) { }

    search(queryString: string): Observable<any> {
        return this.http.get<Product[]>(this.url + queryString);
    }
}

