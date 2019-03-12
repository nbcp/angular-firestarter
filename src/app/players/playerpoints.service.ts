import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerPointsService {

  playerPointsCollection: AngularFirestoreCollection<PlayerPoint>;

  constructor(private afs: AngularFirestore) {
    this.playerPointsCollection = this.afs.collection('playerPoints');
  }

  getPlayerPoint(uid: string, seasonId: string): Observable<PlayerPoint> {
    const playerPoint = this.afs.collection('playerPoints', ref =>
      ref.where('seasonId', '==', seasonId).where('playerId', '==', uid));

    return playerPoint.doc<PlayerPoint>(seasonId + uid).valueChanges();
  }

  getTotalPlayerPoints(uid: string): Observable<PlayerPoint[]> {
    const playerPoints: AngularFirestoreCollection<PlayerPoint> = this.afs.collection('playerPoints', ref =>
      ref.where('playerId', '==', uid));

    return playerPoints.snapshotChanges().pipe(
      map((playerPts) => playerPts.map(item => item.payload.doc.data()))
    );
  }

  getSeasonExp(uid: string, seasonId: string): Observable<number> {
    return this.getPlayerPoint(uid, seasonId).pipe(
      map((playerPoint: PlayerPoint) => playerPoint ? playerPoint.totalPoints : null)
    );
  }

  getTotalExp(uid: string): Observable<number> {
    return this.getTotalPlayerPoints(uid).pipe(map((playerPoints) => {
      let totalPoints = 0;

      playerPoints.forEach(playerPoint => {
        totalPoints += playerPoint.totalPoints;
      });

      return totalPoints;
    }));
  }

}
