import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Article } from '../_models/article.model';
import { environment } from 'src/environments/environment';
import { ArticleComment } from '../_models/article-comment.model';
import moment from 'moment';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  public getArticle(id: number): any {
    return this.http.get<Article>(`${this.baseUrl}articles/${id}/article`);
  }

  public getComments(id: number, page?, itemsPerPage?): Observable<PaginatedResult<ArticleComment[]>> {
    const paginatedResult: PaginatedResult<ArticleComment[]> = new PaginatedResult<ArticleComment[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<ArticleComment[]>(`${this.baseUrl}articles/${id}/comments`, { observe: 'response', params })
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  public getArticles(): Observable<Article[]> {
   return this.http.get<Article[]>(`${this.baseUrl}articles`);
  }

  public getArticleName(name: string) {
    return name.replace(/\s+/g, '-').toLowerCase();
  }

  public isNewArticle(date: Date): boolean {
    return moment(Date.now()).diff(moment(date), 'days') < 30;
  }

  public isArticleTrending(comments: number): boolean {
    return comments >= 40;
  }
}
