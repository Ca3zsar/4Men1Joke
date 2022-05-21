import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-comments-dialog',
  templateUrl: './comments-dialog.component.html',
  styleUrls: ['./comments-dialog.component.css']
})
export class CommentsDialogComponent implements OnInit {
  @Input() joke_id?: string;

  userService: UserService;
  commentsList: Array<any>;



  constructor(userService: UserService) {
    this.userService = userService;
    this.commentsList = []
  }

  ngOnInit(): void {
    if(this.joke_id) {
      this.userService.getCommentsByJokeId(this.joke_id).subscribe(
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

}
