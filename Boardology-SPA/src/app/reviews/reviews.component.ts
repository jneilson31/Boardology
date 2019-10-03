import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../_models/Pagination';
import { ProductService } from '../_services/product.service';
import { Comment } from '../_models/comment.model';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  pagination: Pagination;
  comments: Comment[];
  pageNumber = 1;
  pageSize = 5;
  gameId: string;
  baseUrl = environment.apiUrl;
  product$: Observable<Product>;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
     private authService: AuthService,
     private alertify: AlertifyService,
     private http: HttpClient) { }

  ngOnInit() {
    this.gameId = this.route.snapshot.params['gameId'];
    this.product$ = this.productService.getProduct(this.gameId);
    this.productService.getComments(+this.gameId, this.pageNumber, this.pageSize)
    .subscribe(pagination => {
      this.comments = pagination.result;
      this.pagination = pagination.pagination;
    });

  }

  public checkIfIsUserComment(comment: Comment): boolean {
    if (this.authService.decodedToken) {
      return comment.userId.toString() === this.authService.decodedToken.nameid;
    }
    return false;
  }

  public deleteComment(commentId: number) {
    this.alertify.confirm(
      'Are you sure you want to delete your comment?',
      undefined,
      undefined,
      () => {
        this.http
          .delete(
            `${this.baseUrl}comments/user/${
            this.authService.decodedToken.nameid
            }/game/${this.gameId}/comment/${commentId}/delete`
          )
          .subscribe(
            response => {
              // this.getComments();
              this.productService.updateNumberOfComments(this.product);
            },
            error => {
              this.alertify.error(error.error);
            }
          );
      }
    );
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadComments();
    window.scroll(0, 0);
  }

  loadComments() {
    this.productService.getComments(+this.gameId, this.pagination.currentPage, this.pagination.itemsPerPage)
    .subscribe((pagination: PaginatedResult<Comment[]>) => {
      this.comments = pagination.result;
      this.pagination = pagination.pagination;
    });
  }

}
