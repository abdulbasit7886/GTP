import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AllUserPostsComponent } from './all-userposts/all-userposts.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PeopleComponent } from './people/people.component';
import { SearchComponent } from './search/search.component';
import { FriendRequestsComponent } from './friend-requests/friend-requests.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { MutualFriendsComponent } from './mutual-friends/mutual-friends.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserSettingsComponent,
    AllUserPostsComponent,
    NotificationsComponent,
    PeopleComponent,
    SearchComponent,
    FriendRequestsComponent,
    FriendListComponent,
    MutualFriendsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'user-profile', component: UserProfileComponent},
      { path: 'user-settings', component: UserSettingsComponent },
      { path:'all-userposts', component:AllUserPostsComponent},
      { path:'Search', component:SearchComponent},
      { path:'user-notifications', component:NotificationsComponent},
      { path:'peoples', component:PeopleComponent},
      { path:'requests', component:FriendRequestsComponent},
      { path:'friends', component:FriendListComponent},
      { path:'mutual-friends/:userId', component:MutualFriendsComponent},
    ])
  ]
})
export class DashboardModule { }
