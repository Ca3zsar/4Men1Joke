import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css']
})

export class JokeComponent implements OnInit {
  @Input() jsonString?: string;

  
  constructor() {}

  id = '';

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
      document.getElementById(reaction + `_${this.id}`)?.classList.add("border", "border-info", "rounded-pill", "mr-2", "ml-2");
    }
    else {
      document.getElementById(reaction + `_${this.id}`)?.classList.remove("border", "border-info", "rounded-pill", "mr-2", "ml-2");
    }
  }

  countUpDown(reaction: string) {
    if(reaction == "catOk") {
      if (this.toggledOn_catOk) {
        this.catOk_count = (parseInt(this.catOk_count) - 1).toString();
      }
      else {
        this.catOk_count = (parseInt(this.catOk_count) + 1).toString();
      }
      this.toggledOn_catOk = !this.toggledOn_catOk;
      this.changeButtonState(reaction, this.toggledOn_catOk);
    } 
    else if(reaction == "BASADO") {
      if (this.toggledOn_BASSADO) {
        this.BASADO_count = (parseInt(this.BASADO_count) - 1).toString();
      }
      else {
        this.BASADO_count = (parseInt(this.BASADO_count) + 1).toString();
      }
      this.toggledOn_BASSADO = !this.toggledOn_BASSADO;
      this.changeButtonState(reaction, this.toggledOn_BASSADO);
    } 
    else if(reaction == "questionmark") {
      if (this.toggledOn_questionmark) {
        this.questionmark_count = (parseInt(this.questionmark_count) - 1).toString();
      }
      else {
        this.questionmark_count = (parseInt(this.questionmark_count) + 1).toString();
      }
      this.toggledOn_questionmark = !this.toggledOn_questionmark;
      this.changeButtonState(reaction, this.toggledOn_questionmark);
    }
  }

}
