import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ViewComponent } from './view/view.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditpostComponent } from './editpost/editpost.component';
import { UserRoutingModule } from './user/user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { NotificationComponent } from './notification/notification.component';
import { FriendsComponent } from './friends/friends.component';


@NgModule({
  declarations: [
    CreatepostComponent,
    EditpostComponent,
    ViewComponent,
    ProfileComponent,
    SearchComponent,
    NotificationComponent,
    FriendsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,RouterModule,ReactiveFormsModule,UserRoutingModule
  ]
})
export class DashboardModule { }
