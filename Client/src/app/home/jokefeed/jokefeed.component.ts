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

  @Input() keyword: string | undefined;
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
    console.log(this.keyword);
    this.filteredJokes = [];
    for (var i = 0; i < this.jokes.length; i++) {
      let item = this.jokes[i];
      if (item.joke.author.search(this.keyword) != -1) {
        this.filteredJokes.push(this.jokesJsonStringlike[i]);
      }
    }
  }
}
