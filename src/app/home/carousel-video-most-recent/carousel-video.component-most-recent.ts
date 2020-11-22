import { Component, OnInit } from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {Video} from '../../shared/interfaces/video';
import {Router} from '@angular/router';
import {VideoService} from '../../shared/services/video.service';


@Component({
  selector: 'nwt-carousel-video-most-recent',
  templateUrl: './carousel-video.component-most-recent.html',
  styleUrls: ['./carousel-video.component-most-recent.css']
})

export class CarouselVideoComponentMostRecentComponent implements OnInit {

  // private property to store people value
  private _videos: Video[];


  constructor(private _router: Router, private _videosService: VideoService) {
    this._videos = [];
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
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
  get videos(): Video[] {
    return this._videos;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
    this._videosService
      .fetch().subscribe((videos: Video[]) => {
       this._videos = videos;
       this._videos.sort((a, b) => b.upload_date.localeCompare(a.upload_date));
    });
  }

  /**
   * Function to navigate to current category
   */
  navigate(url: string): void {
    this._router.navigate([ '/video', url ]);
  }
}
