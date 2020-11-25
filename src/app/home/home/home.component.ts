import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../shared/interfaces/user';
import {Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'nwt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private _connectedUser: User;

  constructor(private _router: Router, private _userService: UserService, private _authService: AuthService) {
    this._connectedUser = {} as User;
  }

  ngOnInit(): void {
    this._userService
      .fetchOneByUsername(this._authService.getUsernameStored()).subscribe((connectedUser: User) => {
        this._connectedUser = connectedUser;
    });
  }


  get connectedUser(): User {
    return this._connectedUser;
  }
}
