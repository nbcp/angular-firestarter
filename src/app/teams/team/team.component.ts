import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'team-page',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamPageComponent implements OnInit {

  constructor(private teamService: TeamsService) {
  }

  ngOnInit() {
  }

}
