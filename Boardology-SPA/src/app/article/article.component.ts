import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, Params, ParamMap } from '@angular/router';
import { Article } from '../_models/article.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { FormControl } from '@angular/forms';
import { ArticleComment } from '../_models/article-comment.model';
import { AlertifyService } from '../_services/alertify.service';
import { ArticleService } from '../_services/article.service';
import { SeoService } from '../_services/seo.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
  baseUrl = environment.apiUrl;
  article: Article;
  shouldShow = false;
  @ViewChild('textArea') textArea: ElementRef;
  subscription: Subscription;
  commentField: FormControl = new FormControl();
  comments: ArticleComment[] = [];
  otherArticles: Article[] = [];
  title: string;
  pageNumber = 1;
  pageSize = 5;

  constructor(private route: ActivatedRoute,
     private http: HttpClient,
     public authService: AuthService,
     private alertify: AlertifyService,
     private articleService: ArticleService,
     private seoService: SeoService) { }

  public ngOnInit() {
     this.subscription = this.route.params
      .subscribe((params: Params) => {
        this.getArticle(params.articleId);
        this.getComments(params.articleId, this.pageNumber, this.pageSize);
        this.getOtherArticles(params.articleId);
      });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  public getArticle(id: number): any {
      this.articleService.getArticle(id)
      .subscribe(article => {
        this.article = article;
        this.setSeoData();
      });
  }

  public toggleComment(): void {
    if (!this.authService.checkLogin()) {
      return;
    }
    this.shouldShow = !this.shouldShow;
    if (this.shouldShow) {
      setTimeout(() => {
        // this will make the execution after the above boolean has changed
        this.textArea.nativeElement.focus();
      }, 0);
    }
  }

  public submitComment(): void {
    if (this.commentField.value) {
      this.http
        .post(
          `${this.baseUrl}articles/${this.authService.decodedToken.nameid}/${
          this.article.id
          }/comment`,
          {
            content: this.commentField.value
          }
        )
        .subscribe(
          () => {
            this.shouldShow = false;
            this.article.comments++;
            this.getComments(this.article.id, this.pageNumber, this.pageSize);
            this.commentField.reset();
          },
          error => {
            console.log(error);
          }
        );
    } else {
      console.log('error');
    }
  }


  public deleteComment(commentId: number) {
    this.alertify.confirm(
      'Are you sure you want to delete your comment?',
      undefined,
      undefined,
      () => {
        this.http
          .delete(
            `${this.baseUrl}articles/user/${
            this.authService.decodedToken.nameid
            }/${this.article.id}/comment/${commentId}/delete`
          )
          .subscribe(
            response => {
              this.comments = this.comments.filter(u => u.id !== commentId);
              this.article.comments--;
            },
            error => {
              this.alertify.error(error.error);
            }
          );
      }
    );
  }

  public getUserId(): number {
    return this.authService.decodedToken.nameid;
  }

  public getArticleName(name: string): string {
    return this.articleService.getArticleName(name);
  }

  public isNewArticle(date: Date): boolean {
    return this.articleService.isNewArticle(date);
  }

  public isArticleTrending(comments: number): boolean {
    return this.articleService.isArticleTrending(comments);
  }

  changeArticle(id: number): void {
    this.route.params['articleId'] = id;
  }


  private getComments(articleId: number, page?, itemsPerPage?): void {
    this.articleService.getComments(articleId, page, itemsPerPage)
      .subscribe(comments => {
        this.comments = comments.result;
      });
  }

  private getOtherArticles(articleId: string): void {
    this.articleService.getArticles()
    .subscribe(articles => {
      this.otherArticles = articles.filter(article => article.id !== +articleId);
    });
  }

  private setSeoData(): void {
    this.seoService.setTitle(`${this.article.title} | Boardology`);
  }

}
