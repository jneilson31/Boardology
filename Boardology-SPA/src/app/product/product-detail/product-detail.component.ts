import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../_models/product.model';
import { Comment } from '../../_models/comment.model';
import { FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../_services/auth.service';

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
  signInError = false;
  baseUrl = environment.apiUrl;
  @ViewChild('textArea') textArea: ElementRef;

  constructor(private route: ActivatedRoute, private http: HttpClient, public authService: AuthService) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.product = data['product'];
      this.comments = data['comments'];
    });
  }

  getComments(): void {
    this.http
      .get<Comment[]>(`${this.baseUrl}comments/game/${this.product.id}/comments`)
      .subscribe(comments => {
        this.comments = comments;
      });
  }

  toggleComment(): void {
    if (!this.authService.loggedIn()) {
      this.signInError = true;
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

  submitReview(): void {
    if (this.review.value) {
      this.http
        .post(`${this.baseUrl}comments/${this.authService.decodedToken.nameid}/${this.product.id}/comment`, {
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
      .delete(`${this.baseUrl}comments/user/${this.authService.decodedToken.nameid}/comment/${commentId}/delete`)
      .subscribe(
        response => {
          this.getComments();
        },
        error => {
          console.log(error);
        }
      );
  }

  addToCollection() {
    this.http.post(`${this.baseUrl}games/${this.authService.decodedToken.nameid}/${this.product.id}/collection`, {})
      .subscribe(
        response => {
          console.log('success');
        },
        error => {
          console.log(error.error);
        }
      );
  }
}
