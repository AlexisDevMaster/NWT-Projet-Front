import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Video} from '../shared/interfaces/video';
import {User} from '../shared/interfaces/user';
import {ActivatedRoute, PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from '@angular/router';
import {VideoService} from '../shared/services/video.service';
import {UserService} from '../shared/services/user.service';
import {environment} from '../../environments/environment';
import {isPlatformBrowser} from '@angular/common';
import {AuthService} from '../shared/services/auth.service';
import {test} from '@angular-devkit/core/src/virtual-fs/host';
import {Observable} from 'rxjs';
import {subscribeOn} from 'rxjs/operators';

@Component({
  selector: 'nwt-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {


  // private property to store people value
  private _video: Video;
  private _user: User;
  private _connectedUser: User;
  private _url: string;
  private _backendURL: any;
  private _baseUrl: string;
  private _isSubscribed: number;
  private _isLiked: number;

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _videoService: VideoService,
              private _userService: UserService, private _authService: AuthService) {
    this._url = this._activatedRoute.snapshot.url.pop().path;
    this._backendURL = {};
    this._isLiked = 0;
    this._baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      this._baseUrl += `:${environment.backend.port}`;
    }
    this._video = this._videoService.defaultVideo;
    this._user = this._userService.defaultUser;
    this.initVideo();
  }

  /**
   * Returns private property _categories
   */
  get connectedUser(): User {
    return this._connectedUser;
  }

  /**
   * Returns private property _categories
   */
  get isSubscribed(): number {
    return this._isSubscribed;
  }

  /**
   * Returns private property _categories
   */
  get video(): Video {
    return this._video;
  }

  /**
   * Returns private property _categories
   */
  get user(): User {
    return this._user;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
  }

  initVideo(): void {
    this._videoService
      .fetchOneByUrl(this._url).subscribe((video: Video) => {
        this._video = video;
        this._video.path = this._baseUrl + '/public/videos/' + this.video.path;
        this._video.thumbnail_path = this._baseUrl + '/public/videos/' + this.video.thumbnail_path;

        this._userService
          .fetchOneByUsername(this._video.author).subscribe((user: User) => {
            this._user = user;
            this._user.thumbnail = this._baseUrl + '/public/users/' + this._user.id + '/profile.png';
            console.log('Logged : ' + this.isLogedIn());

            if (this.isLogedIn()) {
              this._userService
                .fetchOneByUsername(this._authService.getUsernameStored()).subscribe((connectedUser: User) => {
                this._connectedUser = connectedUser;
                console.log('Is ' + this._connectedUser.username + ' is subscribe to : ' + this._user.username);
                const testIfSubscribe = this._connectedUser.subscriptions.find(obj => obj.username === this._user.username);
                if (testIfSubscribe) {
                  this._isSubscribed = 1;
                  if(this._connectedUser.likes.find(obj => obj.url === video.url)){

                  }

                } else {
                  this._isSubscribed = -1;
                }
              });
            }
          }
        );
      }
    );


  }

  /**
   * Function to navigate to current category
   */
  navigate404(url: string): void {
    this._router.navigate(['/404', url]);
  }

  navigate(): void {
    this._router.navigate(['/404']);
  }

  isLogedIn(): boolean {
    // return false;
    return this._authService.hasStoredToken();
  }

}
