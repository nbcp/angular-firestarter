import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsService } from './teams.service';
import { TeamComponent } from './team/team.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [TeamsService],
  declarations: [TeamComponent]
})
export class TeamsModule { }
