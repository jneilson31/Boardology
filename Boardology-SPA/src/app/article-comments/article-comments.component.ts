import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../_models/Pagination';
import { ArticleComment } from '../_models/article-comment.model';
import { environment } from 'src/environments/environment';
import { Article } from '../_models/article.model';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../_services/article.service';
import { AlertifyService } from '../_services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-article-comments',
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.scss']
})
export class ArticleCommentsComponent implements OnInit {
  pagination: Pagination;
  articleComments: ArticleComment[];
  pageNumber = 1;
  pageSize = 5;
  articleId: string;
  baseUrl = environment.apiUrl;
  article: Article;
  maxPaginationPages = 5;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private alertify: AlertifyService,
    private http: HttpClient,
    private authService: AuthService) { }

  ngOnInit() {
    this.articleId = this.route.snapshot.params['articleId'];
    this.articleService.getArticle(+this.articleId)
      .subscribe(article => {
        this.article = article;
      });
    this.articleService.getComments(+this.articleId, this.pageNumber, this.pageSize)
      .subscribe(pagination => {
        this.articleComments = pagination.result;
        this.pagination = pagination.pagination;
      });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadComments();
    window.scroll(0, 0);
  }

  loadComments() {
    this.articleService.getComments(+this.articleId, this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((pagination: PaginatedResult<ArticleComment[]>) => {
        this.articleComments = pagination.result;
        this.pagination = pagination.pagination;
      });
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
            }/${this.articleId}/comment/${commentId}/delete`
          )
          .subscribe(
            response => {
              // this.article.comments--;
              // const index = this.articleComments.findIndex(comment => comment.id === commentId);
              // this.articleComments.splice(index, 1);
              this.loadComments();
            },
            error => {
              this.alertify.error(error.error);
            }
          );
      }
    );
  }

  public checkIfIsUserComment(comment: ArticleComment): boolean {
    if (this.authService.decodedToken) {
      return comment.userId.toString() === this.authService.decodedToken.nameid;
    }
    return false;
  }

  public decreaseNumberOfComments(): void {
    this.article.comments--;
  }

}
