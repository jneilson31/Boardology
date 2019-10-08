import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../_models/product.model';
import { Comment } from '../../_models/comment.model';
import { FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { SeoService } from 'src/app/_services/seo.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  gameId: string;
  product: Product;
  comments: Comment[] = [];
  review: FormControl = new FormControl();
  shouldShow = false;
  baseUrl = environment.apiUrl;
  @ViewChild('textArea') textArea: ElementRef;
  pageNumber = 1;
  pageSize = 5;
  @ViewChild('trenton') trenton: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private seoService: SeoService,
    private productService: ProductService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.gameId = this.route.snapshot.params['gameId'];
    this.productService.getProduct(this.gameId)
    .subscribe(product => {
      this.product = product;
      this.setSeoData();
    });
      this.getComments();
  }

//   ngAfterViewInit() {
//     const script = this.renderer2.createElement('script');
//     script.type = 'text/javascript';
//     script.src = 'https://z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=bd4081d7-2918-4444-8f37-e92902ef0bb5';
//     script.text = '';
//   this.renderer2.appendChild(this.trenton.nativeElement, script);
// }

  public getComments(): void {
    this.productService.getComments(+this.gameId, this.pageNumber, this.pageSize)
      .subscribe(comments => {
        this.comments = comments.result;
      });
  }

  public checkIfIsUserComment(comment: Comment): boolean {
    if (this.authService.decodedToken) {
      return comment.userId.toString() === this.authService.decodedToken.nameid;
    }
    return false;
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

  public submitReview(): void {
    if (this.review.value) {
      this.productService.updateNumberOfComments(this.product);
      this.http
        .post(
          `${this.baseUrl}comments/${this.authService.decodedToken.nameid}/${
          this.product.id
          }/comment`,
          {
            content: this.review.value
          }
        )
        .subscribe(
          () => {
            this.shouldShow = false;
            this.product.numReviews++;
            this.productService.getComments(+this.gameId, this.pageNumber, this.pageSize)
              .subscribe(comments => {
                this.comments = comments.result;
              });
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
            }/game/${this.product.id}/comment/${commentId}/delete`
          )
          .subscribe(
            response => {
              this.getComments();
              this.product.numReviews--;
              this.productService.updateNumberOfComments(this.product);
            },
            error => {
              this.alertify.error(error.error);
            }
          );
      }
    );
  }

  public addToWishlist() {
    if (!this.authService.checkLogin()) {
      return;
    }

    this.http
      .post(
        `${this.baseUrl}wishlist/${this.authService.decodedToken.nameid}/${
        this.product.id
        }/wishlist`,
        {}
      )
      .subscribe(
        response => {
          this.alertify.success('Game added to your Wishlist!');
        },
        error => {
          this.alertify.error(error.error);
        }
      );
  }

  public addToCollection() {
    if (!this.authService.checkLogin()) {
      return;
    }

    this.http
      .post(
        `${this.baseUrl}collection/${this.authService.decodedToken.nameid}/${
        this.product.id
        }/collection`,
        {}
      )
      .subscribe(
        response => {
          this.alertify.success('Game added to your Collection!');
        },
        error => {
          this.alertify.error(error.error);
        }
      );
  }

  public viewAllReviews(): void {
    this.productService.currentProductId = this.product.id.toString();
    this.router.navigate(['reviews', this.product.id, this.product.name]);
  }

  private setSeoData(): void {
    this.seoService.setTitle(`${this.product.name} | Boardology`);
  }
}
