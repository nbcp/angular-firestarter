import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';

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

  getUsers(team: Team): Observable<User[]> {
    return this.usersCollection.valueChanges();
  }

  getApplications(team: Team) {
    
  }
}
