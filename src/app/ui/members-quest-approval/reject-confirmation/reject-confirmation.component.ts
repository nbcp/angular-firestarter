import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'reject-confirmation',
  templateUrl: './reject-confirmation.component.html',
  styleUrls: ['./reject-confirmation.component.scss']
})
export class RejectConfirmationComponent implements OnInit {

  rejected = false;

  constructor() { }

  ngOnInit() {
  }

  reject() {
    this.rejected = true;
  }

}
