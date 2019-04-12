import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmailService } from '../core/email.service';

@Injectable()
export class TeamsService {

  membersCollection: AngularFirestoreCollection<Membership>;
  teamsCollection: AngularFirestoreCollection<Team>;

  constructor(private afs: AngularFirestore, private emailService: EmailService) {
    this.membersCollection = this.afs.collection('membership');
    this.teamsCollection = this.afs.collection('teams');
  }

  addMembership(uid: string, displayName: string, email: string, teamId: string, teamName: string) {
    return this.membersCollection.doc<Membership>(uid).set({
      uid: uid,
      isApproved: false,
      isLead: false,
      teamId: teamId,
      teamName: teamName,
      displayName: displayName,
      email: email
    });
  }

  addToTeam(uid: string) {
    return this.membersCollection.doc<Membership>(uid).update({
      isApproved: true
    });
  }

  getMembership(uid: string): Observable<Membership> {
    return this.membersCollection.doc<Membership>(uid).valueChanges();
  }

  getTeams(): Observable<Team[]> {
    return this.teamsCollection.snapshotChanges().pipe(
      map((teams) => teams.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        })
      )
    );
  }

  getTeamLeadEmails(teamId: string): Observable<string[]> {
    const leadMembersCollection: AngularFirestoreCollection<Membership> = this.afs.collection('membership', ref =>
    ref.where('teamId', '==', teamId).where('isLead', '==', true));

    return leadMembersCollection.snapshotChanges().pipe(
      map((members) => members.map(item => item.payload.doc.data().email))
    );
  }

  getTeamMembers(teamId: string, isApproved = true): Observable<Membership[]> {
    this.membersCollection = this.afs.collection('membership', ref =>
      ref.where('teamId', '==', teamId).where('isApproved', '==', isApproved));
    return this.membersCollection.snapshotChanges().pipe(
      map((members) => members.map(item => item.payload.doc.data()))
    );
  }

  getTeamId(uid: string): Observable<string> {
    return this.getMembership(uid).pipe(
      map((membership: Membership) => membership ? membership.teamId : null)
    );
  }

  getTeamName(teamId: string): Observable<string> {
    return this.teamsCollection.doc<Team>(teamId).valueChanges().pipe(
      map( (team: Team) => team.name )
    );
  }

  isLead(uid: string): Observable<boolean> {
    return this.membersCollection.doc<Membership>(uid).valueChanges().pipe(
      map((membership: Membership) => membership ? membership.isLead : false)
    );
  }

  setAsLead(uid: string, isLead: boolean) {
    this.membersCollection.doc<Membership>(uid).update({
      isLead: isLead
    });
  }

  removeTeamMember(uid: string) {
    return this.membersCollection.doc<Membership>(uid).delete();
  }
}
