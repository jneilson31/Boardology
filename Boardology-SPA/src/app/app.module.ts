import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderPrimaryComponent } from './shared/header/header-primary/header-primary.component';
import { JumbotronComponent } from './home/jumbotron/jumbotron.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SearchComponent } from './shared/search/search.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductItemComponent } from './product/product-item/product-item.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ReviewsComponent } from './reviews/reviews.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SearchService } from './shared/search/search.service';
import {ReactiveFormsModule} from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TimeAgoPipe } from 'time-ago-pipe';
import { CategorySortPipe } from './_pipes/category-sort.pipe';

import { RegisterComponent } from './register/register.component';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginFormComponent } from './login-form/login-form.component';

import { CategoryComponent } from './shared/category/category.component';
import { HomeIntroContentComponent } from './home/home-intro-content/home-intro-content.component';
import { ProductService } from './_services/product.service';
import { ProductListResolver } from './_resolvers/product-list-resolver';
import { ProductDetailResolver } from './_resolvers/product-detail-resolver';
import { ProductDetailCommentsResolver } from './_resolvers/product-detail-comments-resolver';
import { CategoryGameComponent } from './shared/category/category-game/category-game.component';
import { CollectionComponent } from './collection/collection.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CacheInterceptorProvider } from './shared/interceptors/cache.interceptor';
import { ErrorInterceptorProvider } from './shared/interceptors/error.interceptor';

export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      HeaderPrimaryComponent,
      JumbotronComponent,
      FooterComponent,
      SearchComponent,
      ProductListComponent,
      ProductItemComponent,
      ProductDetailComponent,
      HomeComponent,
      ReviewsComponent,
      AboutComponent,
      ContactComponent,
      TimeAgoPipe,
      RegisterComponent,
      LoginFormComponent,
      CategoryComponent,
      HomeIntroContentComponent,
      CategoryGameComponent,
      CategorySortPipe,
      CollectionComponent,
      WishlistComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      RouterModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      AngularFontAwesomeModule,
      JwtModule.forRoot({
          config: {
              tokenGetter: tokenGetter,
              whitelistedDomains: ['localhost:5000'],
              blacklistedRoutes: ['localhost:5000/api/auth']
          }
      }),
      FormsModule
   ],
   providers: [
      SearchService,
      ProductService,
      ProductListResolver,
      ProductDetailResolver,
      ProductDetailCommentsResolver,
      CacheInterceptorProvider,
      ErrorInterceptorProvider
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
