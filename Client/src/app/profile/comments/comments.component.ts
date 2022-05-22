import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  userService : UserService;
  tokenStorageService : TokenStorageService;

  commentsList: Array<any>;

  constructor(userService : UserService, tokenStorageService: TokenStorageService) {
    this.userService = userService;
    this.tokenStorageService = tokenStorageService

    this.commentsList = []
   }

  ngOnInit(): void {
    this.userService.getCommentsByUsername(this.tokenStorageService.getUser()).subscribe(
      data => {
        var jsonObject = JSON.parse(data);

        var keys = Object.keys(jsonObject);

        for(var i = 0; i < keys.length; i++) {
          var comment = {
            username: jsonObject[keys[i]].username,
            comment: jsonObject[keys[i]].comment,
            joke_id: jsonObject[keys[i]].joke_id,
            createdAt: jsonObject[keys[i]].createdAt
          }
          this.commentsList.push(comment);
        }
      }
    );
  }

}
