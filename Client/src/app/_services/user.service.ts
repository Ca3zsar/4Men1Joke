import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'https://man1joke.lm.r.appspot.com';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, public storage : TokenStorageService) { }

  getAllJokes(): Observable<any> {
    return this.http.get(API_URL + '/jokes', { responseType: 'text' });
  }

  getJokeById(joke_id: string): Observable<any> {
    return this.http.get(API_URL + `/jokes/${joke_id}`, { responseType: 'text' });
  }

  getReactsOfUser(): Observable<any>{
    let username = this.storage.getUser();
    return this.http.get(API_URL + `/reacts/${username}`, { responseType: 'text' });
  }

  getJokesByUsername(username: string): Observable<any> {
    return this.http.get(API_URL + `/username/${username}/jokes`, { responseType: 'text' });
  }

  // ----------------------------------------------------

  updateVote(joke_id: string, vote: string, jwt : string): Observable<any> {
    return this.http.put(API_URL + `/jokes/${joke_id}`, {
      "type" : vote,
      "token" : jwt
    });
  }

  // ----------------------------------------------------

  postComment(joke_id: string, username: string, comment: string): Observable<any> {
    return this.http.post(API_URL + `/jokes/${joke_id}/comments`, { username, comment }, { responseType: 'text' });
  }


  getCommentsByJokeId(joke_id: string): Observable<any> {
    return this.http.get(API_URL + `/jokes/${joke_id}/comments`, { responseType: 'text' });
  }

  getCommentsByUsername(username: string): Observable<any> {
    return this.http.get(API_URL + `/users/${username}/comments/jokes`, { responseType: 'text' });
  }

  // ----------------------------------------------------


  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

}
