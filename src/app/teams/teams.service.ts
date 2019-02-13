import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TeamsService {

  tasksCollection: AngularFirestoreCollection<Task>;
  teamMembers: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) {
    this.tasksCollection = this.afs.collection('tasks');
  }

  searchTasks(keyword: string): Observable<Task[]> {
    this.tasksCollection = this.afs.collection('tasks', ref =>
      ref.orderBy('name')
        .limit(5)
        .startAt(keyword.toUpperCase())
        .endAt(`${keyword.toLowerCase()}\uf8ff`));

    return this.tasksCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getTask(id: string): AngularFirestoreDocument<Task> {
    return this.afs.doc<Task>(`tasks/${id}`);
  }

  createTask(task: Task) {
    return this.tasksCollection.add(task);
  }

  updatetask(id: string, data: Task) {
    return this.getTask(id).update(data);
  }

  deletetask(id: string) {
    return this.getTask(id).delete();
  }

  getTeam(tid: string) {
    return this.afs.doc<Team>(`teams/${tid}`);
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

  getTeamApplication(uid: string) {
    return this.afs.doc<TeamApplication>(`team_applications/${uid}`);
  }

  getTeamMembers(team: Team): Observable<User[]> {
    this.teamMembers = this.afs.collection(
      'users',
      x => x.where('team/lead', '==', team.lead));
    return this.teamMembers.valueChanges();
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
