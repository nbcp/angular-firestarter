import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../core/auth.service';
import { TeamsService } from 'src/app/teams/teams.service';
import { EmailService } from 'src/app/core/email.service';

@Component({
  selector: 'join-team-page',
  templateUrl: './join-team-page.component.html',
  styleUrls: ['./join-team-page.component.scss']
})
export class JoinTeamPageComponent implements OnInit {

  teams$: Observable<Team[]>;

  constructor(public auth: AuthService, private teamsService: TeamsService, private email: EmailService) {}

  ngOnInit() {
    this.teams$ = this.teamsService.getTeams();
  }

  applyForTeam(user: User, teamId: string) {
    this.teamsService.addMembership(user.uid, user.displayName, user.email, teamId, this.emailLead.bind(this));
  }

  cancelApplication(user: User) {
    this.teamsService.removeTeamMember(user.uid);
  }

  private emailLead(name: string, leadEmail: string) {
    const subject = `[Gamification of Learnings and Certifications] ${name} wants to join your team!`;
    const body = `<p>Player Name: ${name}</p>

    <p>Please visit your <a href='https://leaderboard-79b77.firebaseapp.com/profile'>dashboard</a> to approve request and assign quests.</p>
    `;

    this.email.sendEmail(
      leadEmail,
      subject,
      body,
      'HTML').subscribe();

  }
}
