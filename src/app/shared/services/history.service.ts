import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import { Category } from '../interfaces/category';
import {catchError, defaultIfEmpty, filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  // private property to store all backend URLs
  private readonly _backendURL: any;
  // private property to store default category
  private readonly _defaultCategory: Category;

  constructor(private _http: HttpClient) {
    this._defaultCategory = {
      title: 'https://randomuser.me/api/portraits/lego/6.jpg',
      thumbnail: 'firstname',
      url: 'lastname'
    };
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
    console.log(this._backendURL);
  }

  /**
   * Returns private property _defaultPerson
   */
  get defaultCategory(): Category {
    return this._defaultCategory;
  }

  test404Resources(query: string): Observable<any> {
    return this._http
      .get(query)
      .pipe(
        map(() => {}),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      );
  }

  /**
   * Function to return list of category
   */
  fetch(): Observable<Category[]> {
    return this._http.get<Category[]>(this._backendURL.allCategories)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }

  /**
   * Function to return one random category from categories list
   */
  fetchRandom(): Observable<Category> {
    return this._http.get<Category>(this._backendURL.randomPeople)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty(this._defaultCategory)
      );
  }

  /**
   * Function to return one category for current id
   */
  fetchOne(id: string): Observable<Category> {
    return this._http.get<Category>(this._backendURL.onePeople.replace(':id', id));
  }

  /**
   * Function to create a new category
   */
  create(category: Category): Observable<any> {
    return this._http.post<Category>(this._backendURL.allPeople, category, this._options());
  }

  /**
   * Function to update one category
   */
  update(id: string, category: Category): Observable<any> {
    return this._http.put<Category>(this._backendURL.onePeople.replace(':id', id), category, this._options());
  }

  /**
   * Function to delete one category for current id
   */
  delete(id: string): Observable<string> {
    return this._http.delete(this._backendURL.onePeople.replace(':id', id))
      .pipe(
        map(_ => id)
      );
  }

  /**
   * Function to return request options
   */
  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }
}
