import { Component, OnInit } from '@angular/core';

import { UserService } from '../../model/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  welcome = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.welcome = this.userService.isLoggedIn ? `welcome ${this.userService.user.name}` : 'please log in';
  }

}
