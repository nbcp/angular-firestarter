import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';

import { TasksPageComponent } from './tasks-page.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TasksService } from './tasks.service';
import { UserTasksService } from './user-tasks.service';
import { TeamsModule } from '../teams/teams.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    // Developer Modules
    TeamsModule
  ],
  declarations: [
    TaskListComponent,
    TasksPageComponent,
  ],
  providers: [
    TasksService,
    UserTasksService,
  ]
})
export class TasksModule { }
