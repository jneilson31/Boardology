import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderPrimaryComponent } from './header/header-primary/header-primary.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderPrimaryComponent,
    JumbotronComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
