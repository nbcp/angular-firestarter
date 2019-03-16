import { Component, OnInit, Input } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { TeamsService } from 'src/app/teams/teams.service';
import { PlayerPointsService } from '../../player-quest/player-points.service';
import { MatDialog } from '@angular/material';
import { KickDialogComponent } from '../kick-dialog/kick-dialog.component';

@Component({
  selector: 'team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent implements OnInit {

  PLACEHOLDER_SEASON = 'CJbPw8e8U9JkpIWlDnnl';

  @Input() currentUser: User;
  teamMembers$: Observable<Membership[]>;
  members$: Observable<Membership[]>;
  title: string;

  readonly memberColumns = ['displayName', 'exp', 'seasonRank', 'kickButton'];


  constructor(private dialog: MatDialog,
    private teamsService: TeamsService,
    private playerPointsService: PlayerPointsService
  ) {}

  ngOnInit() {
    if (this.currentUser && this.currentUser.membership) {
      this.title = this.currentUser.membership.isLead ?
        'Team Members' :
        'Team Leaderboard';

      this.teamMembers$ =
        this.teamsService.getTeamMembers(this.currentUser.membership.teamId);

      const teamId = this.currentUser.membership.teamId;
      this.members$ = this.mergeMemberInfo(teamId);
    }
  }

  addTeamMember(uid: string) {
    this.teamsService.addToTeam(uid);
  }

  kickButtonisVisible(uid: string) {
    return this.currentUser.membership.isLead && (uid !== this.currentUser.uid);
  }

  removeTeamMember(uid) {
    const kickMemberDialog = this.dialog.open(KickDialogComponent, {
      data: { }
    });

    kickMemberDialog.afterClosed().subscribe(result => {
      if (result) {
        this.teamsService.removeTeamMember(uid);
      }
    });
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

  private mergeMemberInfo(teamId: string): Observable<Membership[]> {
    const teamMembers$ = this.teamsService.getTeamMembers(teamId);
    const teamPoints$ = this.playerPointsService.getTeamPoints(teamId, this.PLACEHOLDER_SEASON);

    return combineLatest(teamMembers$, teamPoints$).pipe(
      map(([teamMembers, teamPoints]) => {
        return this.joinMemberPoints(teamMembers, teamPoints);
      })
    );
  }

  private joinMemberPoints(members: Membership[], playerPoints: PlayerPoints[]): Membership[] {

    members.forEach( member => {
      const match = playerPoints.find( (playerPoint) => {
        return playerPoint.playerId === member.uid;
      });

      if (match) {
        member.seasonExp = match.totalPoints;
      }
    });

    return members;
  }

}
