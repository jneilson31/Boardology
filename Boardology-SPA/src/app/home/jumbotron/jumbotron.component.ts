import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss']
})

export class JumbotronComponent implements OnInit {

  userName: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
  }

  isLoggedIn(): boolean {
    if (this.authService.loggedIn()) {
      this.userName = this.authService.decodedToken.unique_name;
      return true;
    }
    return false;
  }

}
