import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { ConfirmationModalComponent } from './confirmation-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationModalService {

  constructor(private dialog: MatDialog) {}

  /**
   * @param  {ConfirmationModalData} data contains message and confirm button text
   * @return {Observable<boolean>}   returns true if confirm button is clicked
   */
  showConfirmation(data: ConfirmationModalData): Observable<boolean> {
    const assignQuestDialog =
      this.dialog.open(ConfirmationModalComponent, { data }) as MatDialogRef<ConfirmationModalComponent, boolean>;

    return assignQuestDialog.afterClosed().pipe(
      flatMap(yes => yes ? of(true) : EMPTY)
    );
  }
}
