import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import {Add} from '../interfaces/add';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}
  private apiUrl = environment.backend.protocol + '://' + environment.backend.host + ':' + environment.backend.port;

  // private xClientInfoHeader = {
  //   appVersion: '1.0.0',
  //   os: 'macOS',
  //   osVersion: '10.14.5',
  //   device: 'mac Mini',
  //   lang: 'sv'
  // };

  private addSource = new BehaviorSubject(false);
  currentAdd = this.addSource.asObservable();
  private formData = new BehaviorSubject(null);
  currentForm = this.formData.asObservable();

  private httpOptions = {
    headers: new HttpHeaders()
      // .append("X-ClientInfo", JSON.stringify(this.xClientInfoHeader))
      .append('Authorization', 'Bearer ' + this.getAccessToken())
  };

  changeAdd(add: boolean): void {
    this.addSource.next(add);
  }

  changeForm(form: Add): void {
    this.formData.next(form);
  }

  loadAds(): Observable<any> {
    const endpoint = this.apiUrl + '/ads';

    return this.httpClient.get<Add[]>(endpoint, this.httpOptions);
  }

  newAdd(add: Add, file: File): Observable<any> {
    const endpoint = this.apiUrl + '/ads';

    const postData = new FormData();
    postData.append('title', add.title);
    postData.append('order', add.order.toString());
    postData.append('text', add.text);
    postData.append('url', add.url.toString());
    postData.append('file', file, file.name);

    return this.httpClient.post(endpoint, postData, this.httpOptions);
  }

  saveAds(ads: Add[]): Observable<any> {
    const endpoint = this.apiUrl + '/ads';
    return this.httpClient.put(endpoint, ads, this.httpOptions);
  }

  updateAdd(add: Add, id: number): Observable<any> {
    const endpoint = this.apiUrl + '/ads/' + id;
    let postData: Add | FormData;

    if (add.file) {
      postData = new FormData();
      postData.append('_id', add._id.toString());
      postData.append('order', add.order.toString());
      postData.append('text', add.text.toString());
      postData.append('title', add.title.toString());
      postData.append('url', add.url.toString());
      postData.append('file', add.file, add.file.name);
    } else {
      postData = {
        _id: add._id,
        order: add.order,
        text: add.text,
        title: add.title,
        url: add.url,
        imageUrl: add.imageUrl
      };
    }

    return this.httpClient.put(endpoint, postData, this.httpOptions);
  }

  deleteAdd(id: number): Observable<Add[]> {
    const endpoint = this.apiUrl + `/ads/${id}`;
    return this.httpClient.delete<Add[]>(endpoint, this.httpOptions);
  }

  getAccessToken(): string {
    return sessionStorage.getItem(this.authService.TOKEN_KEY);
  }
}
