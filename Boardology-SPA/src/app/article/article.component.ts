import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, Params, ParamMap } from '@angular/router';
import { Article } from '../_models/article-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  baseUrl = environment.apiUrl;
  article: Article;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    // this.getArticle(this.route.snapshot.params.articleId);

    this.route.params
      .subscribe((params: Params) => {
        this.getArticle(params.articleId);
      });
  }


  getArticle(id: number): any {
    return this.http.get<Article>(`${this.baseUrl}articles/${id}`)
      .subscribe(article => {
        this.article = article;
        console.log(this.article);
      });
  }

}
