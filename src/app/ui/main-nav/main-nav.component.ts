import { Component, OnInit } from '@angular/core';
import { ToolbarItem } from './toolbar-item.model';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  toolbarItems : ToolbarItem[];
  
  show = false;

  constructor() {
    this.toolbarItems = [
      new ToolbarItem("Home", "/", ""),
      new ToolbarItem("Tasks", "/", ""),
      new ToolbarItem("Leaderboard", "/", ""),
      new ToolbarItem("Party", "/", "")
    ];
   }

  toggleCollapse() {
    this.show = !this.show;
  }

}
