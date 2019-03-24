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
import { ProductListResolver } from './_resolvers/product-list-resolver';
import { ProductDetailResolver } from './_resolvers/product-detail-resolver';
import { ProductDetailCommentsResolver } from './_resolvers/product-detail-comments-resolver';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        children: [
            { path: 'games', component: ProductListComponent, resolve: {products: ProductListResolver} },
            { path: 'games/:gameId', component: ProductDetailComponent, resolve: {product: ProductDetailResolver,
                comments: ProductDetailCommentsResolver} },
            { path: 'reviews', component: ReviewsComponent },
            { path: 'about-us', component: AboutComponent },
            { path: 'contact-us', component: ContactComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'login', component: LoginFormComponent }
        ]
    }
];

@NgModule({

    imports: [RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
