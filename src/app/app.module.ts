import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderPrimaryComponent } from './shared/header/header-primary/header-primary.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SearchComponent } from './shared/search/search.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductItemComponent } from './product/product-item/product-item.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { LoginComponent } from './shared/header/login/login.component';

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
    LoginComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
