import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://man1joke.lm.r.appspot.com';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getAllJokes(): Observable<any> {
    return this.http.get(API_URL + '/jokes', { responseType: 'text' });
  }


  getJokesByUsername(username: string): Observable<any> {
    return this.http.get(API_URL + `/username/${username}/jokes`, { responseType: 'text' });
  }

  // ----------------------------------------------------


  catOk_countup(joke_id : string): Observable<any> {
    return this.http.put(API_URL + `/jokes/${joke_id}/catOk_countup`, { responseType: 'text' });
  }

  catOk_countdown(joke_id : string): Observable<any> {
    return this.http.put(API_URL + `/jokes/${joke_id}/catOk_countdown`, { responseType: 'text' });
  }

  BASADO_countup(joke_id : string): Observable<any> {
    return this.http.put(API_URL + `/jokes/${joke_id}/BASADO_countup`, { responseType: 'text' });
  }

  BASADO_countdown(joke_id : string): Observable<any> {
    return this.http.put(API_URL + `/jokes/${joke_id}/BASADO_countdown`, { responseType: 'text' });
  }

  questionmark_countup(joke_id : string): Observable<any> {
    return this.http.put(API_URL + `/jokes/${joke_id}/questionmark_countup`, { responseType: 'text' });
  }

  questionmark_countdown(joke_id : string): Observable<any> {
    return this.http.put(API_URL + `/jokes/${joke_id}/questionmark_countdown`, { responseType: 'text' });
  }


  // ----------------------------------------------------


  postComment(joke_id: string, username: string, comment: string): Observable<any> {
    return this.http.post(API_URL + `/jokes/${joke_id}/comments`, { username, comment }, { responseType: 'text' });
  }


  getCommentsByJokeId(joke_id: string): Observable<any> {
    return this.http.get(API_URL + `/jokes/${joke_id}/comments`, { responseType: 'text' });
  }

  getCommentsByUsername(username: string): Observable<any> {
    return this.http.get(API_URL + `/users/${username}/comments`, { responseType: 'text' });
  }

  // ----------------------------------------------------


  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

}
