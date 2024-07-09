import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { PostdetailComponent } from './postdetail/postdetail.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'createPost',
    component: CreatepostComponent
  },
  {
    path: 'homepage',
    component: HomepageComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'posts/:postId',
    component: PostdetailComponent,
  },
  {
    path: 'users/:username',
    component: ProfileComponent
  },
  // Redirect from root path '/' to '/login'
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // Handle all other routes with a wildcard route to redirect to '/login'
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
