import { NgModule } from '@angular/core';
import { Routes, RouterModule, } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { RegisterComponent } from './register/register.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ProductDetailResolver } from './_resolvers/product-detail-resolver';
import { ProductDetailCommentsResolver } from './_resolvers/product-detail-comments-resolver';
import { CollectionComponent } from './collection/collection.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CollectionGuard } from './_guards/collection.guard';
import { WishlistGuard } from './_guards/wishlist.guard';
import { ArticleComponent } from './article/article.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        children: [
            { path: 'games', component: ProductListComponent},
            { path: 'games/:gameId/:name', component: ProductDetailComponent, resolve: {product: ProductDetailResolver,
                comments: ProductDetailCommentsResolver} },
            { path: 'reviews', component: ReviewsComponent },
            { path: 'about-us', component: AboutComponent },
            { path: 'contact-us', component: ContactComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'login', component: LoginFormComponent },
            { path: 'collection', component: CollectionComponent, canActivate: [CollectionGuard] },
            { path: 'wishlist', component: WishlistComponent, canActivate: [WishlistGuard] },
            { path: 'password-reset', component: ResetPasswordComponent},
            { path: 'article/:articleId/:name', component: ArticleComponent }
        ]
    }
];

@NgModule({

    imports: [RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
