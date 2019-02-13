import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsService } from './teams.service';
import { TeamsComponent } from './teams.component';
import { TeamPageComponent } from './team/team.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    TeamsService
  ],
  declarations: [TeamsComponent, TeamPageComponent]
})
export class TeamsModule { }
