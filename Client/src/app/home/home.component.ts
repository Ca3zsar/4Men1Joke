import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  jokes_feed?: string;
  options = {"sort" :"date asc"};

  send(options : any){
    this.options = options;
  }

  constructor() { }

  ngOnInit(): void {

  }
}
