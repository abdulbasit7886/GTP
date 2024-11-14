import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { ViewComponent } from './dashboard/view/view.component';
import { CreatePostComponent } from './dashboard/create-post/create-post.component';
import { EditPostComponent } from './dashboard/edit-post/edit-post.component';
import { UserProfileComponent } from './dashboard/user/user-profile/user-profile.component';
import { EditProfileComponent } from './dashboard/user/edit-profile/edit-profile.component';
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path:'dashboard',component:ViewComponent},
  {path:'create-post',component:CreatePostComponent},
  {path:'edit-post',component:EditPostComponent},
  {path:'user-profile',component:UserProfileComponent},
  {path:'edit-profile',component:EditProfileComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
