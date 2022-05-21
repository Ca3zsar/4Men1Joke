import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  
  jokesJsonStringlike = Array<string>();
  tokenStorage: TokenStorageService;
  userService: UserService;
  constructor(userService: UserService  , tokenStorage : TokenStorageService) { 
    this.tokenStorage = tokenStorage;
    this.userService = userService;
  }

  ngOnInit(): void {
    this.userService.getAllJokes().subscribe({
      next: data => {
        var jsonResponse = JSON.parse(data);

        var keys = Object.keys(jsonResponse.jokes);

        for (var i = 0; i < keys.length; i++) {

          var outputFormat = {
            "id": i,
            "joke_key": keys[i],
            "joke": jsonResponse.jokes[keys[i]]
          }
          this.jokesJsonStringlike.push(JSON.stringify(outputFormat));
        }
      },
      error: err => {
        console.log(JSON.parse(err.error).message)
      }
  });
}}
