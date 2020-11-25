import {Component, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {Video} from '../../shared/interfaces/video';
import {Router} from '@angular/router';
import {VideoService} from '../../shared/services/video.service';
import {environment} from '../../../environments/environment';
import {User} from '../../shared/interfaces/user';
import {UserService} from '../../shared/services/user.service';
import {AuthService} from '../../shared/services/auth.service';


@Component({
  selector: 'nwt-carousel-video-most-rated',
  templateUrl: './carousel-video.component-most-rated.html',
  styleUrls: ['./carousel-video.component-most-rated.css']
})

export class CarouselVideoComponentMostRatedComponent implements OnInit {

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

  /**
   * Returns private property _categories
   */
  get users(): User[] {
    return this._users;
  }

  /**
   * Returns private property _categories
   */
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
      this._videos.sort((a, b) => ((100 * b.nb_like / (b.nb_like + b.nb_dislike)) - ((100 * a.nb_like / (a.nb_like + a.nb_dislike)))));
    });
  }

  /**
   * Function to navigate to current category
   */
  navigate(url: string): void {
    this._router.navigate(['/video', url]);
  }
}
