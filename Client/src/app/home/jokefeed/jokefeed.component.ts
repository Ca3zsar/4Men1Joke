import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jokefeed',
  templateUrl: './jokefeed.component.html',
  styleUrls: ['./jokefeed.component.css']
})
export class JokefeedComponent implements OnInit {
  jokesJsonStringlike = Array<string>();
  constructor() { }

  ngOnInit(): void {
    var mock_up_data = {
      jokes : [
        {
          author : "Andrei Toma",
          createdAt : "2019-11-12T12:00:00.000Z",
          content : "Presedintele cand pleaca din tara...tot presedinte e",
          photo_url : "https://i.imgur.com/qkdpN.jpg",
          catOk_count : "2222",
          BASADO_count : "1",
          questionmark_count : "1",
          keys : [
            "dark",
            "mom",
            "andrei",
          ]
        },
        {
          author : "Andrei Toma",
          createdAt : "2019-11-12T12:00:00.000Z",
          content : "Presedintele cand pleaca din tara...tot presedinte e",
          photo_url : "https://upload.wikimedia.org/wikipedia/commons/f/fe/EPP_Summit%3B_Meise%2C_Dec._2013_%2811449226465%29_%28cropped_2%29.jpg",
          catOk_count : "2",
          BASADO_count : "1",
          questionmark_count : "1",
          keys : [
            "dark",
            "mom",
            "andrei",
          ]
        }
      ]
    }

    var jokesArrayObj = mock_up_data.jokes;
    this.jokesJsonStringlike = []

    for (var i = 0; i < jokesArrayObj.length; i++) {
      var outputFormat = {
        id : i,
        joke : jokesArrayObj[i]
      }
      this.jokesJsonStringlike.push(JSON.stringify(outputFormat));
    }
  }
  



}
