import {Component, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {Video} from '../../shared/interfaces/video';
import {Router} from '@angular/router';
import {VideoService} from '../../shared/services/video.service';
import {environment} from '../../../environments/environment';
import {User} from '../../shared/interfaces/user';
import {UserService} from '../../shared/services/user.service';


@Component({
  selector: 'nwt-carousel-video-most-recent',
  templateUrl: './carousel-video.component-most-recent.html',
  styleUrls: ['./carousel-video.component-most-recent.css']
})

export class CarouselVideoComponentMostRecentComponent implements OnInit {

  // private property to store people value
  private _videos: Video[];
  private _users: User[];

  private _baseUrl: string;

  constructor(private _router: Router, private _videosService: VideoService, private _usersService: UserService) {
    this._videos = [];
    this._users = [];

    this._baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      this._baseUrl += `:${environment.backend.port}`;
    }
  }

  customOptions: OwlOptions = {
    loop: true,
    items: 8,
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
  isDragging: boolean;

  /**
   * Returns private property _categories
   */
  get videos(): Video[] {
    return this._videos;
  }

  get users(): User[] {
    return this._users;
  }

  user(username: string): User {
    return this._users.find(obj => obj.username === username);
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
    this._videosService
      .fetch().subscribe((videos: Video[]) => {
      this._videos = videos;
      this._videos.forEach(obj => {
        console.log(obj.thumbnail_path);
        obj.thumbnail_path = this._baseUrl + '/public/videos/' + obj.thumbnail_path;
        this._videosService.test404Resources(obj.thumbnail_path).subscribe(
          (_) => console.log(obj.thumbnail_path),
          error => {
            if (error.status === 404) {
              obj.thumbnail_path = 'assets/images/no_preview.png';
            }
          }
        );
        this._usersService.fetchOneByUsername(obj.author).subscribe((user: User) => {
          this._users.push(user);
        });
      });
      this._videos.sort((a, b) => b.upload_date.localeCompare(a.upload_date));
    });
  }

  /**
   * Function to navigate to current category
   */
  navigate(url: string): void {
    this._router.navigate(['/video', url]);
  }
}
