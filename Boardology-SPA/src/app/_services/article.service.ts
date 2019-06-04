import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../_models/article.model';
import { environment } from 'src/environments/environment';
import { ArticleComment } from '../_models/article-comment.model';
import moment from 'moment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  public getArticle(id: number): any {
    return this.http.get<Article>(`${this.baseUrl}articles/${id}/article`);
  }

  public getComments(id: number): any {
    return this.http.get<ArticleComment[]>(`${this.baseUrl}articles/${id}/comments`);
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
