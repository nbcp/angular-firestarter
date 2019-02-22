import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AdminService } from './admin.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { NotifyService } from './notify.service';

@NgModule({
  imports: [
    MatSnackBarModule,
  ],
  providers: [
    AdminService,
    AuthService,
    AuthGuard,
    NotifyService,
  ]
})
export class CoreModule { }
