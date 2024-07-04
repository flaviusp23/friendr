import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { PostdetailComponent } from './postdetail/postdetail.component';

const routes: Routes = [
  {
    path:'',component:LoginComponent
  },
  {
    path:'createPost',component:CreatepostComponent
  },
  {
    path:'homepage',component:HomepageComponent,
  },
  {
    path:'posts/:postId',component:PostdetailComponent,
  },
  {
    path:'**',redirectTo:''// o varianta ar trb sa punem o alta componenta notfound dar e mai bine asa cu redicrect
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
