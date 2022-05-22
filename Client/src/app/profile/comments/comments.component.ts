import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  userService : UserService;
  tokenStorageService : TokenStorageService;





  commentsList: Array<any>;

  constructor(userService : UserService, tokenStorageService: TokenStorageService, private http: HttpClient) {
    this.userService = userService;
    this.tokenStorageService = tokenStorageService

    this.commentsList = []
  }


  async getJokeById(id: string): Promise<any> {
    const data = new Promise((resolve, reject) => { var resp =  this.http.get('http://127.0.0.1:8000' + `/jokes/${id}`, { responseType: 'text' }); resolve(resp); });
    return await data;
    var resp = await this.http.get('http://127.0.0.1:8000' + `/jokes/${id}`, { responseType: 'text' }).toPromise();
    return resp;
  }
  

  ngOnInit(): void {
    this.userService.getCommentsByUsername(this.tokenStorageService.getUser()).subscribe(
      data => {
        var jsonObject = JSON.parse(data);

        var keys = Object.keys(jsonObject);

        for(var i = 0; i < keys.length; i++) {

          var joke = this.userService.getJokeById(jsonObject[keys[i]].joke_id).subscribe(
            data => {
              var joke = data;

              var comment = {
                username: jsonObject[keys[i]].username,
                comment: jsonObject[keys[i]].comment,
                joke_id: jsonObject[keys[i]].joke_id,
                createdAt: jsonObject[keys[i]].createdAt,
                joke : joke
              }

              this.commentsList.push(comment);

            }
          )
        }
      }
    );
  }

}
