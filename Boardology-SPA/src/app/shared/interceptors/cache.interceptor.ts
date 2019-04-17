import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpCacheService } from '../../_services/http-cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    constructor(private cacheService: HttpCacheService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {

        if (req.method !== 'GET') {
            this.cacheService.invalidateCache();
            return next.handle(req);
        }

        const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);

        if (cachedResponse) {
            return of(cachedResponse);
        }

        return next.handle(req)
        .pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    this.cacheService.put(req.url, event);
                }
            })
        );
    }

}

export const CacheInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: CacheInterceptor,
  multi: true
};
