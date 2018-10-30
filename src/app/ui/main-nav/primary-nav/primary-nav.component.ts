import { Component, OnInit, Input } from '@angular/core';
import { ToolbarItem } from '.././toolbar-item.model';

@Component({
  selector: '[primary-nav]',
  templateUrl: './primary-nav.component.html',
  styleUrls: ['./primary-nav.component.scss']
})
export class PrimaryNavComponent implements OnInit {

  @Input('items') toolbarItems : ToolbarItem[];

  constructor() { }

  ngOnInit() {
  }

}
