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

  constructor(private route: ActivatedRoute,
     private http: HttpClient,
     private authService: AuthService,
     private alertify: AlertifyService) { }

  public ngOnInit() {
    // this.getArticle(this.route.snapshot.params.articleId);

     this.subscription = this.route.params
      .subscribe((params: Params) => {
        this.getArticle(params.articleId);
        this.getComments(params.articleId);
      });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  public getArticle(id: number): any {
      this.http.get<Article>(`${this.baseUrl}articles/${id}/article`)
      .subscribe(article => {
        this.article = article;
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
            this.getComments(this.article.id);
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
            }/comment/${commentId}/delete`
          )
          .subscribe(
            response => {
              this.comments = this.comments.filter(u => u.id !== commentId);
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


  private getComments(articleId: number): void {
    this.http
      .get<ArticleComment[]>(
        `${this.baseUrl}articles/${articleId}/comments`
      )
      .subscribe(comments => {
        this.comments = comments;
      });
  }

}
