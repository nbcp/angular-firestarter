import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TeamsService {

  usersCollection: AngularFirestoreCollection<User>;
  teamsCollection: AngularFirestoreCollection<Team>;
  teamDocument:   AngularFirestoreDocument<Team>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection('users');
    this.teamsCollection = this.afs.collection('teams');
  }

  getData(): Observable<Team[]> {
    return this.teamsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getTeam(id: string) {
    return this.afs.doc<Team>(`teams/${id}`);
  }

  getTeamApplication(uid: string) {
    return this.afs.doc<TeamApplication>(`team_applications/${uid}`);
  }

  updateteam(id: string, data: any) {
    return this.getTeam(id).update(data);
  }

  deleteteam(id: string) {
    return this.getTeam(id).delete();
  }

  getTeamLead(team: Team): Observable<User> {
    return this.afs.doc<User>(`users/${team.lead}`).valueChanges();
  }

  getUser(uid: string): AngularFirestoreDocument<User> {
    return this.afs.doc<User>(`users/${uid}`);
  }

  setUserTeam(uid: string, team: Team) {
    return this.getUser(uid).update({ team });
  }

  getTeamApplications(team: Team): Observable<TeamApplication[]> {
    const teamApplications: AngularFirestoreCollection<TeamApplication> = this.afs.collection(
      'team_applications', 
      x => x.where("team_id", "==", team.id)
      );

    return teamApplications.valueChanges();
  }

  getTeamMembers(team: Team): Observable<User[]> {
    const teamMembers:AngularFirestoreCollection<User> = this.afs.collection(
      'users',
      x => x.where("team/lead", "==", team.lead)
    );

    return teamMembers.valueChanges();
  }

  addTeamMember(uid: string, team: Team) {
    this.afs.collection('user').doc(uid).set(team);
  }

  acceptTeamApplication(uid: string, team: Team) {
    this.deleteTeamApplication(uid);
    this.addTeamMember(uid, team);
  }

  deleteTeamApplication(uid: string) {
    return this.getTeamApplication(uid).delete();
  }
  
  deleteTeamMember(user: User) {
    delete(user.team);
    // Remove team property from the document
    this.afs.collection('user').doc(user.uid).update(user);
  }

}
