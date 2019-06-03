import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, Params, ParamMap } from '@angular/router';
import { Article } from '../_models/article-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
  baseUrl = environment.apiUrl;
  article: Article;

  subscription: Subscription;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    // this.getArticle(this.route.snapshot.params.articleId);

    const subscription = this.route.params
      .subscribe((params: Params) => {
        this.getArticle(params.articleId);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  getArticle(id: number): any {
      this.http.get<Article>(`${this.baseUrl}articles/${id}`)
      .subscribe(article => {
        this.article = article;
        console.log(this.article);
      });
  }

}
