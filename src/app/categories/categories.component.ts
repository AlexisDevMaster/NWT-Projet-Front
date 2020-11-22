import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CategoryService} from '../shared/services/category.service';
import {Category} from '../shared/interfaces/category';


@Component({
  selector: 'nwt-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  private _categories: Category[];

  constructor(private _router: Router, private _categoriesService: CategoryService) {
    this._categories = [];
  }

  /**
   * Returns private property _categories
   */
  get categories(): Category[] {
    return this._categories;
  }


  ngOnInit(): void {
    this._categoriesService
      .fetch().subscribe((categories: Category[]) => {
      this._categories = categories;
    });
  }

  /**
   * Function to navigate to current category
   */
  navigate(id: string): void {
    this._router.navigate([ '/category', id ]);
  }

}
