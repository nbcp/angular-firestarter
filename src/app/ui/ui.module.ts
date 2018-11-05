import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  MatToolbarModule,
  MatProgressBarModule,
  MatGridListModule,
  MatListModule
} from '@angular/material';

import { UserLoginComponent } from './user-login/user-login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NotificationMessageComponent } from './notification-message/notification-message.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SsrPageComponent } from './ssr-page/ssr-page.component';
import { PrimaryNavComponent } from './main-nav/primary-nav/primary-nav.component';
import { ProfileNavComponent } from './main-nav/profile-nav/profile-nav.component';
import { HomeLeaderboardComponent } from './home-page/leaderboard/leaderboard.component';
import { HomeTasksComponent } from './home-page/tasks/tasks.component';
import { HomePartyComponent } from './home-page/party/party.component';
import { RewardsComponent } from './home-page/rewards/rewards.component';
import { TasksPageComponent } from './tasks-page/tasks-page.component';

import { FirestoreDatePipe } from './firestore-date.pipe';
import { LeaderboardService } from './home-page/leaderboard.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatGridListModule,
    MatListModule
  ],
  declarations: [
    UserLoginComponent,
    HomePageComponent,
    MainNavComponent,
    LoadingSpinnerComponent,
    NotificationMessageComponent,
    UserProfileComponent,
    UserFormComponent,
    SsrPageComponent,
    FirestoreDatePipe,
    PrimaryNavComponent,
    ProfileNavComponent,
    HomeLeaderboardComponent,
    HomeTasksComponent,
    HomePartyComponent,
    RewardsComponent,
    TasksPageComponent
  ],
  exports: [
    MainNavComponent,
    LoadingSpinnerComponent,
    NotificationMessageComponent,
    UserProfileComponent,
    UserFormComponent
  ],
  providers: [
    LeaderboardService,
  ]
})
export class UiModule {}
