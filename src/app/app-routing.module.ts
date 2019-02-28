import { NgModule } from '@angular/core';
import { Routes, RouterModule, } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'games', component: ProductListComponent },
    { path: 'reviews', component: ReviewsComponent },
    { path: 'about-us', component: AboutComponent },
    { path: 'contact-us', component: ContactComponent },

];

@NgModule({

    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}