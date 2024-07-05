import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { PostComponent } from './post/post.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { PostdetailComponent } from './postdetail/postdetail.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    TopNavbarComponent,
    PostComponent,
    CreatepostComponent,
    PostdetailComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
