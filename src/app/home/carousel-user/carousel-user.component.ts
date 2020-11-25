import {Component, Input, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {environment} from '../../../environments/environment';
import {User} from '../../shared/interfaces/user';
import {Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {AuthService} from '../../shared/services/auth.service';


@Component({
  selector: 'nwt-carousel-user',
  templateUrl: './carousel-user.component.html',
  styleUrls: ['./carousel-user.component.css']
})
export class CarouselUserComponent implements OnInit {


  private _users: User[];
  private _baseUrl: string;
  private _isSubscribed: boolean[];
  private _connectedUser: User;

  constructor(private _router: Router, private _userService: UserService, private _authService: AuthService, private _usersService: UserService) {
    this._users = [];
    this._baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      this._baseUrl += `:${environment.backend.port}`;
    }
  }

  @Input('connectedUser')
  set connectedUser(value: User) {
    this._connectedUser = value;
  }

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 600,
    margin: 10,
    autoWidth: true,
    autoHeight: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      900: {
        items: 3
      }
    },
    nav: false
  };

  /**
   * Returns private property _categories
   */
  get users(): User[] {
    return this._users;
  }


  get isSubscribed(): boolean[] {
    return this._isSubscribed;
  }

  ngOnInit(): void {
    this._userService
      .fetch().subscribe((users: User[]) => {
      this._users = users;
      this._users.forEach(obj => {
        obj.thumbnail = this._baseUrl + '/public/users/' + obj.thumbnail;
        this._userService.test404Resources(obj.thumbnail).subscribe(
          (_) => console.log(obj.thumbnail),
          error => {
            if (error.status === 404) {
              obj.thumbnail = 'assets/images/no_preview_user.png';
            }
          }
        );
      });

      if (this.isLogedIn()) {
        this._users.forEach((obj2, index) => {
          this._isSubscribed.push(this._connectedUser.subscriptions.find(o => o.username === obj2.username));
        });
      }
    });
  }

  isLogedIn(): boolean {
    // return false;
    return this._authService.hasStoredToken();
  }

}
