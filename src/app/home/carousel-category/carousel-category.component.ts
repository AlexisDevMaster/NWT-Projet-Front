import {Component, OnInit, ViewChild} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {Router} from '@angular/router';
import {CategoryService} from '../../shared/services/category.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Category} from '../../shared/interfaces/category';

export class CarouselData {
  id?: string;
  title?: string;
  thumbnail?: string;
  url?: string;
}

@Component({
  selector: 'nwt-carousel-category',
  templateUrl: './carousel-category.component.html',
  styleUrls: ['./carousel-category.component.css']
})
export class CarouselCategoryComponent implements OnInit {

  // private property to store people value
  private _categories: Category[];

  carouselData: Category[] = [
    { title: 'Slide 1', thumbnail: 'assets/images/350x450&text=1.png', url: 'one'},
    { title: 'Slide 2', thumbnail: 'assets/images/350x650&text=2.png', url: 'two'},
    { title: 'Slide 3', thumbnail: 'assets/images/350x250&text=3-fallback.png', url: 'three'},
    { title: 'Slide 4', thumbnail: 'assets/images/350x250&text=4.png', url: 'four'},
    { title: 'Slide 5', thumbnail: 'assets/images/350x250&text=5.png', url: 'five'},
    // { text: 'Slide 6', dotContent: 'text5'},
    // { text: 'Slide 7', dotContent: 'text5'},
    // { text: 'Slide 8', dotContent: 'text5'},
    // { text: 'Slide 9', dotContent: 'text5'},
    // { text: 'Slide 10', dotContent: 'text5'},
  ];

  constructor(private _router: Router, private _categoriesService: CategoryService, private _dialog: MatDialog) {
    this._categories = [];
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
  get categories(): Category[] {
    return this._categories;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
    this._categoriesService
      .fetch().subscribe((categories: Category[]) => {
        this._categories = categories;
        console.log(this._categories);
      });
  }

  /**
   * Function to navigate to current category
   */
  navigate(id: string): void {
    this._router.navigate([ '/category', id ]);
  }

}
