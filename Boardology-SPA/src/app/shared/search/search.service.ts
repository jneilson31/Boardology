import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Product } from '../../product/product.model';
import { Observable } from 'rxjs';

@Injectable()
export class SearchService {
    url = 'http://localhost:5000/api/games/search?search=';

    constructor(private http: HttpClient) { }

    search(queryString: string): Observable<any> {
        return this.http.get<Product[]>(this.url + queryString);
    }
}

