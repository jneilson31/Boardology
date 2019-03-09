import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../_models/product.model';
import { Comment } from '../../_models/comment.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit {
  productId: number;
  product: Product;
  comments: Comment[] = [];
  review: FormControl = new FormControl();
  shouldShow = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.productId = this.route.snapshot.params.gameid;
    this.getProduct();
    this.getComments();
  }

  getProduct(): Product {
    this.http
      .get<Product>(`http://localhost:5000/api/games/${this.productId}`)
      .subscribe(product => {
        this.product = product;
      });
    return this.product;
  }

  getComments(): Comment[] {
    this.http
      .get<Comment[]>(
        `http://localhost:5000/api/comments/game/${this.productId}`
      )
      .subscribe(comments => {
        this.comments = comments;
        console.log(this.comments);
      });
    return this.comments;
  }

  toggleComment(): void {
    this.shouldShow = !this.shouldShow;
  }

  submitReview(): void {
    if (this.review.value) {
      this.http.post('http://localhost:5000/api/comments/1/2', {
        'content': this.review.value
      })
        .subscribe(result => {
          console.log('did it');
          this.shouldShow = false;
          this.getComments();
        }, error => {
          console.log(error);
        });
    } else {
      console.log('error');
    }
  }
}
