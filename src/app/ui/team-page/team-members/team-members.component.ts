import { Component, OnInit, Input } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { TeamsService } from 'src/app/teams/teams.service';
import { PlayerPointsService } from 'src/app/players/playerpoints.service';

@Component({
  selector: 'team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent implements OnInit {

  PLACEHOLDER_SEASON = 'CJbPw8e8U9JkpIWlDnnl';

  @Input() currentUser: User;
  teamMembers$: Observable<Membership[]>;
  members$: Observable<Membership>[];
  title: string;

  readonly memberColumns = ['displayName', 'exp', 'seasonRank', 'kickButton'];

  constructor(private teamsService: TeamsService,
    private playerPointsService: PlayerPointsService
    ) {}

  ngOnInit() {
    if (this.currentUser && this.currentUser.membership) {
      this.title = this.currentUser.membership.isLead ?
        'Team Members' :
        'Team Leaderboard';

      this.teamMembers$ =
        this.teamsService.getTeamMembers(this.currentUser.membership.teamId);

     this.teamMembers$.subscribe(members => {
        this.members$ = members.map(this.getMemberInfo.bind(this));
      });
    }
  }

  addTeamMember(uid) {
    this.teamsService.addToTeam(uid);
  }

  kickButtonisVisible(uid: string) {
    return this.currentUser.membership.isLead && (uid !== this.currentUser.uid);
  }

  removeTeamMember(uid) {
    this.teamsService.removeTeamMember(uid);
  }

  private getMemberInfo(member: Membership): Observable<Membership> {
    const uid = member.uid;
    const membership$ = this.teamsService.getMembership(uid);
    const totalExp$ = this.playerPointsService.getTotalExp(uid);
    const seasonExp$ = this.playerPointsService.getSeasonExp(uid, this.PLACEHOLDER_SEASON); // till we get seasonService handled

    return combineLatest(membership$, totalExp$, seasonExp$).pipe(
      map(([membership, totalExp, seasonExp]) => ({ ...membership, totalExp, seasonExp }))
    );
  }

}
