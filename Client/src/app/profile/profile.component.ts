import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  username: string;
  email: string;

  component_flag = 1;


  constructor(private token: TokenStorageService) {
    this.username = this.token.getUser();
    this.email = 'gigel@gmail.com'
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }


  toggleComponent(flag: number) {
    this.component_flag = flag;
  }
}
