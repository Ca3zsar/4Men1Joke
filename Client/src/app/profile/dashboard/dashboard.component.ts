import { Component, Input, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() username?: string;
  @Input() email?: string;


  constructor(private token: TokenStorageService) {
   }

  ngOnInit(): void {
  }

} 