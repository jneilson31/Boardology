import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from 'src/app/_models/article.model';
import { environment } from 'src/environments/environment';
import moment from 'moment';
import { ArticleService } from 'src/app/_services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  baseUrl = environment.apiUrl;
  articles: Article[];

  constructor(private http: HttpClient, private articleService: ArticleService) { }

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this.http.get<Article[]>(`${this.baseUrl}articles`)
    .subscribe(articles => {
      this.articles = articles;
    });
  }

  getArticleName(name: string) {
    return this.articleService.getArticleName(name);
  }

  isNewArticle(date: Date): boolean {
    return this.articleService.isNewArticle(date);
  }

  isArticleTrending(comments: number): boolean {
    return this.articleService.isArticleTrending(comments);
  }

}
