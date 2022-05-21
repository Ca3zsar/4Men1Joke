import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string;
  email: string;

  
  constructor(private token: TokenStorageService) {
    this.username = this.token.getUser();
    this.email = 'gigel@gmail.com'
   }

  ngOnInit(): void {
  }

}
