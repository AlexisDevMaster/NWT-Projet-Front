import {Component, OnInit, ViewChild} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {Router} from '@angular/router';
import {CategoryService} from '../../shared/services/category.service';
import {Category} from '../../shared/interfaces/category';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'nwt-carousel-category',
  templateUrl: './carousel-category.component.html',
  styleUrls: ['./carousel-category.component.css']
})
export class CarouselCategoryComponent implements OnInit {

  // private property to store people value
  private _categories: Category[];
  private _baseUrl: string;

  constructor(private _router: Router, private _categoriesService: CategoryService) {
    this._categories = [];
    this._baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      this._baseUrl += `:${environment.backend.port}`;
    }
  }

  customOptions: OwlOptions = {
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
      this._categories.forEach(obj => {
        obj.thumbnail = this._baseUrl + '/public/categories/' + obj.thumbnail;
        this._categoriesService.test404Resources(obj.thumbnail).subscribe(
          (_) => console.log(obj.thumbnail),
          error => {
            if (error.status === 404) {
              obj.thumbnail = 'assets/images/no_preview_category.png';
            }
          }
        );
      });
    });
  }

  /**
   * Function to navigate to current category
   */
  navigate(id: string): void {
    this._router.navigate(['/category', id]);
  }

}
