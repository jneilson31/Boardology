import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../_models/product.model';
import { Comment } from '../../_models/comment.model';
import { FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: number;
  product: Product;
  comments: Comment[] = [];
  review: FormControl = new FormControl();
  shouldShow = false;
  baseUrl = environment.apiUrl;
  @ViewChild('textArea') textArea: ElementRef;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.productId = this.route.snapshot.params.gameid;
    this.getProduct();
    this.getComments();
  }

  getProduct(): void {
    this.http
      .get<Product>(`${this.baseUrl}/games/${this.productId}/game`)
      .subscribe(product => {
        this.product = product;
      });
  }

  getComments(): void {
    this.http
      .get<Comment[]>(
        `${this.baseUrl}/comments/game/${this.productId}/comments`
      )
      .subscribe(comments => {
        this.comments = comments;
      });
  }

  toggleComment(): void {
    this.shouldShow = !this.shouldShow;
    if (this.shouldShow) {
      setTimeout(() => { // this will make the execution after the above boolean has changed
        this.textArea.nativeElement.focus();
      }, 0);
    }
  }

  submitReview(productId: number): void {
    if (this.review.value) {
      this.http
        .post(`${this.baseUrl}}/comments/1/${productId}`, {
          content: this.review.value
        })
        .subscribe(
          (comment: Comment) => {
            this.shouldShow = false;
            this.getComments();
            this.review.reset();
          },
          error => {
            console.log(error);
          }
        );
    } else {
      console.log('error');
    }
  }

  deleteComment(commentId: number) {
    this.http
      .delete(`${this.baseUrl}/comments/user/1/comment/${commentId}/delete`)
      .subscribe(
        response => {
          this.getComments();
        },
        error => {
          console.log(error);
        }
      );
  }
}
