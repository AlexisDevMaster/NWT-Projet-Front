import { Component, OnInit } from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';

export class CarouselData {
  id?: string;
  text: string;
  dataMerge?: number;
  width?: number;
  dotContent?: string;
  src?: string;
  dataHash?: string;
}

@Component({
  selector: 'nwt-carousel-video',
  templateUrl: './carousel-video.component.html',
  styleUrls: ['./carousel-video.component.css']
})

export class CarouselVideoComponent implements OnInit {

  carouselData: CarouselData[] = [
    { text: 'Slide 1', src: 'assets/images/350x450&text=1.png', dataHash: 'one'},
    { text: 'Slide 2', src: 'assets/images/350x650&text=2.png', dataHash: 'two'},
    { text: 'Slide 3', src: 'assets/images/350x250&text=3-fallback.png', dataHash: 'three'},
    { text: 'Slide 4', src: 'assets/images/350x250&text=4.png', dataHash: 'four'},
    { text: 'Slide 5', src: 'assets/images/350x250&text=5.png', dataHash: 'five'},
    // { text: 'Slide 6', dotContent: 'text5'},
    // { text: 'Slide 7', dotContent: 'text5'},
    // { text: 'Slide 8', dotContent: 'text5'},
    // { text: 'Slide 9', dotContent: 'text5'},
    // { text: 'Slide 10', dotContent: 'text5'},
  ];

  constructor() { }

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

  ngOnInit(): void {
  }

}
