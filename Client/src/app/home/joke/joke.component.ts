import { Component, Input, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';


@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css']
})

export class JokeComponent implements OnInit {
  @Input() jsonString?: string;

  userService: UserService;
  tokenStorage: TokenStorageService;

  constructor(userService: UserService, tokenStorage: TokenStorageService) {
    this.userService = userService;
    this.tokenStorage = tokenStorage;
  }

  id = '';
  joke_key = '';

  author = '';
  createdAt = '';
  content = '';
  photo_url = '';
  catOk_count = '';
  BASADO_count = '';
  questionmark_count = '';
  keys?: string[];


  toggledOn_catOk = false;
  toggledOn_BASSADO = false;
  toggledOn_questionmark = false;

  ngOnInit(): void {
    if(this.jsonString) {
      var jokeObj = JSON.parse(this.jsonString);

      this.id = jokeObj.id;
      this.joke_key = jokeObj.joke_key;

      this.author = jokeObj.joke.author;
      this.createdAt = jokeObj.joke.createdAt;
      this.content = jokeObj.joke.content;
      this.photo_url = jokeObj.joke.photo_url;
      this.catOk_count = jokeObj.joke.catOk_count;
      this.BASADO_count = jokeObj.joke.BASADO_count;
      this.questionmark_count = jokeObj.joke.questionmark_count;
      this.keys = jokeObj.joke.keys;
    }
  }

  changeButtonState(reaction: string, toggledOn: boolean) {
    if(toggledOn) {
      document.getElementById(reaction + `_${this.joke_key}`)?.classList.add("border", "border-info", "rounded-pill", "mr-2", "ml-2");
    }
    else {
      document.getElementById(reaction + `_${this.joke_key}`)?.classList.remove("border", "border-info", "rounded-pill", "mr-2", "ml-2");

    }
  }

  countUpDown(reaction: string) {

    if(Object.keys(this.tokenStorage.getUser()).length === 0) return;

    if(reaction == "catOk") {
      if (this.toggledOn_catOk) {
        this.catOk_count = (parseInt(this.catOk_count) - 1).toString()
        this.userService.catOk_countdown(this.joke_key).subscribe();
      }
      else {
        this.catOk_count = (parseInt(this.catOk_count) + 1).toString();
        this.userService.catOk_countup(this.joke_key).subscribe();
      }
      this.toggledOn_catOk = !this.toggledOn_catOk;
      this.changeButtonState(reaction, this.toggledOn_catOk);
    } 
    else if(reaction == "BASADO") {
      if (this.toggledOn_BASSADO) {
        this.BASADO_count = (parseInt(this.BASADO_count) - 1).toString();
        this.userService.BASADO_countdown(this.joke_key).subscribe();
      }
      else {
        this.BASADO_count = (parseInt(this.BASADO_count) + 1).toString();
        this.userService.BASADO_countup(this.joke_key).subscribe();
      }
      this.toggledOn_BASSADO = !this.toggledOn_BASSADO;
      this.changeButtonState(reaction, this.toggledOn_BASSADO);
    } 
    else if(reaction == "questionmark") {
      if (this.toggledOn_questionmark) {
        this.questionmark_count = (parseInt(this.questionmark_count) - 1).toString();
        this.userService.questionmark_countdown(this.joke_key).subscribe();
      }
      else {
        this.questionmark_count = (parseInt(this.questionmark_count) + 1).toString();
        this.userService.questionmark_countup(this.joke_key).subscribe();
      }
      this.toggledOn_questionmark = !this.toggledOn_questionmark;
      this.changeButtonState(reaction, this.toggledOn_questionmark);
    }
  }
}
