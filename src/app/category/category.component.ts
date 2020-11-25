import { Component, OnInit } from '@angular/core';
import {Video} from '../shared/interfaces/video';
import {Category} from '../shared/interfaces/category';
import {Router} from '@angular/router';
import {CategoryService} from '../shared/services/category.service';
import {VideoService} from '../shared/services/video.service';

@Component({
  selector: 'nwt-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  private _videos: Video[];

  constructor(private _router: Router, private _videosService: VideoService) {
    this._videos = [];
  }

  ngOnInit(): void {
    this._videosService
      .fetch().subscribe((videos: Video[]) => {
      this._videos = videos;
    });
  }

  /**
   * Returns private property _categories
   */
  get videos(): Video[] {
    return this._videos;
  }
}
