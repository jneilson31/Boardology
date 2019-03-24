import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-primary',
  templateUrl: './header-primary.component.html',
  styleUrls: ['./header-primary.component.scss']
})
export class HeaderPrimaryComponent implements OnInit {
  menuStatus: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onClickMenu() {
    this.menuStatus = !this.menuStatus;
  }

}
