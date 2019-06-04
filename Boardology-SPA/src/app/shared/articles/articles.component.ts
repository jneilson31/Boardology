import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from 'src/app/_models/article.model';
import { environment } from 'src/environments/environment';
import moment from 'moment';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  baseUrl = environment.apiUrl;
  articles: Article[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this.http.get<Article[]>(`${this.baseUrl}articles`)
    .subscribe(articles => {
      this.articles = articles;
      console.log('articles', articles.length);
    });
  }

  getArticleName(name: string) {
    return name.replace(/\s+/g, '-').toLowerCase();
  }

  isNewArticle(date: Date): boolean {
    return moment(Date.now()).diff(moment(date), 'days') < 30;
  }

  isArticleTrending(comments: number): boolean {
    return comments >= 40;
  }

}
