import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  model: any = {};

  constructor() { }

  ngOnInit() {
  }

  login() {
    console.log('logging in');
  }

}
