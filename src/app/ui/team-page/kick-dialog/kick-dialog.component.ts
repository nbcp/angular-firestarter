import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'kick-dialog',
  templateUrl: './kick-dialog.component.html',
  styleUrls: ['./kick-dialog.component.scss']
})
export class KickDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<KickDialogComponent>) { }

  ngOnInit() {
  }


  confirmKick() {
    this.dialogRef.close(true);
  }
}
