import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AllUserPostsComponent } from './all-userposts/all-userposts.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserSettingsComponent,
    AllUserPostsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'user-profile', component: UserProfileComponent},
      { path: 'user-settings', component: UserSettingsComponent },
      { path:'all-userposts', component:AllUserPostsComponent}
    ])
  ]
})
export class DashboardModule { }
