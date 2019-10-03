import { Injectable } from '@angular/core';
import { HttpResponse, HttpRequest } from '@angular/common/http';


const maxAge = 600000;

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {
  cache = new Map();

  constructor() { }

  put(url: string, response: HttpResponse<any>): void {
    const entry = { url, response, lastRead: Date.now()};
    this.cache.set(url, entry);

    const expired = Date.now() - maxAge;
    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }
    });
  }

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);
    if (!cached || cached.lastRead < Date.now() - maxAge ) {
      return undefined;
    }
    return cached.response;
  }

  invalidateUrl(url: string): void {
  this.cache.delete(url);
  }

  invalidateCache(): void {
    this.cache.clear();
  }
}
