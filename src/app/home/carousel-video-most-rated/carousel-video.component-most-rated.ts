import { Component, OnInit } from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {Video} from '../../shared/interfaces/video';
import {Router} from '@angular/router';
import {VideoService} from '../../shared/services/video.service';


@Component({
  selector: 'nwt-carousel-video-most-rated',
  templateUrl: './carousel-video.component-most-rated.html',
  styleUrls: ['./carousel-video.component-most-rated.css']
})

export class CarouselVideoComponentMostRatedComponent implements OnInit {

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
      this._videos.sort((a, b) => ((100 * b.nb_like / (b.nb_like + b.nb_dislike)) - ((100 * a.nb_like / (a.nb_like + a.nb_dislike)))));
    });
  }

  /**
   * Function to navigate to current category
   */
  navigate(url: string): void {
    this._router.navigate([ '/video', url ]);
  }
}
