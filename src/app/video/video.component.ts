import { Component, OnInit } from '@angular/core';
import {Video} from '../shared/interfaces/video';
import {User} from '../shared/interfaces/user';
import {ActivatedRoute, PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from '@angular/router';
import {VideoService} from '../shared/services/video.service';
import {UserService} from '../shared/services/user.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'nwt-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {


  // private property to store people value
  private _video: Video;
  private _user: User;
  private _url: string;
  private _backendURL: any;
  private _baseUrl: string;


  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _videoService: VideoService, private _userService: UserService) {
    const tree: UrlTree = _router.parseUrl(_router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this._url = s[1].path;
    // build backend base url
    this._backendURL = {};
    this._baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      this._baseUrl += `:${environment.backend.port}`;
    }
  }


  /**
   * Returns private property _categories
   */
  get video(): Video {
    return this._video;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
    this._videoService
      .fetchOneByUrl(this._url).subscribe((video: Video) => {
      this._video = video;
      this._video.path =  this._baseUrl + '/public/videos/' +  this._video.path;
      this._video.thumbnail_path =  this._baseUrl + '/public/videos' + this._video.thumbnail_path;

    });
    // this._video = this._videoService.defaultVideo;
  }

  /**
   * Function to navigate to current category
   */
  navigate(url: string): void {
    this._router.navigate([ '/video', url ]);
  }
}
