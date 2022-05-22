import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-jokefeed',
  templateUrl: './jokefeed.component.html',
  styleUrls: ['./jokefeed.component.css']
})
export class JokefeedComponent implements OnInit {
  jokesJsonStringlike = Array<string>();
  jokes = Array<any>();
  filteredJokes = Array<string>();

  @Input() options: any;
  constructor(private userService: UserService) { }

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
          this.jokes.push(outputFormat);
        }
        this.filteredJokes = this.jokesJsonStringlike;
      },
      error: err => {
        console.log(JSON.parse(err.error).message)
      }
    });
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {
    let author = this.options.author;
    let tags = this.options.tags;
    let isChecked = this.options.hasImage;

    let tempJokes = [];
    this.filteredJokes = [];


    for (var i = 0; i < this.jokes.length; i++) {
      let item = this.jokes[i];
      if (item.joke.author.toLowerCase().search(author.toLowerCase(),) != -1) {
        this.filteredJokes.push(this.jokesJsonStringlike[i]);
        tempJokes.push(this.jokes[i]);
      }
    }

    if (tags && tags.length > 0) {
      for (var i = tempJokes.length - 1; i >= 0; i--) {
        let item = tempJokes[i];
        let intersection = item.joke.keys.filter((x: any) => tags.includes(x));
        if (intersection.length == 0) {
          this.filteredJokes.splice(i, 1);
          tempJokes.splice(i, 1);
        }
      }
    }

    if(isChecked){
      for (var i = this.filteredJokes.length - 1; i >= 0; i--) {
        let item = tempJokes[i];
        if(item.joke.photo_url == ''){
          this.filteredJokes.splice(i, 1);
        }
      }
    }

  }
}
