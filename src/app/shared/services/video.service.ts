import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Video } from '../interfaces/video';
import { defaultIfEmpty, filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  // private property to store all backend URLs
  private readonly _backendURL: any;
  // private property to store default video
  private readonly _defaultVideo: Video;

  constructor(private _http: HttpClient) {
    this._defaultVideo = {
      title: 'No title',
      time: Date(),
      upload_date: Date(),
      nb_like: 500,
      nb_dislike: 30,
      author: 'Admin',
      description: 'No description',
      path:  '',
      type: 'video/mp4',
      thumbnail_path: '',
      nb_view: 5000,
      url: 'default',
      categories: [{id: '', title: ''}]
    };
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
  }

  /**
   * Returns private property _defaultPerson
   */
  get defaultVideo(): Video {
    return this._defaultVideo;
  }

  /**
   * Function to return list of video
   */
  fetch(): Observable<Video[]> {
    return this._http.get<Video[]>(this._backendURL.allVideos)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }

  /**
   * Function to return one random video from videos list
   */
  fetchRandom(): Observable<Video> {
    return this._http.get<Video>(this._backendURL.randomPeople)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty(this._defaultVideo)
      );
  }

  /**
   * Function to return one video for current id
   */
  fetchOne(id: string): Observable<Video> {
    return this._http.get<Video>(this._backendURL.oneVideo.replace(':id', id));
  }

  /**
   * Function to return one video for current id
   */
  fetchOneByUrl(url: string): Observable<Video> {
    return this._http.get<Video>(this._backendURL.oneVideoByUrl.replace(':url', url));
  }


  /**
   * Function to create a new video
   */
  create(video: Video): Observable<any> {
    return this._http.post<Video>(this._backendURL.allPeople, video, this._options());
  }

  /**
   * Function to update one video
   */
  update(id: string, video: Video): Observable<any> {
    return this._http.put<Video>(this._backendURL.onePeople.replace(':id', id), video, this._options());
  }

  /**
   * Function to delete one video for current id
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
