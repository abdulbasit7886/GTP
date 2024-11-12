import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserPostsComponent} from '../user-posts/user-posts.component'

const routes: Routes = [
  {path:'post', component: UserPostsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPostsRoutingModule { }
