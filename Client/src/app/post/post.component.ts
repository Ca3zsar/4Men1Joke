import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FileUploadComponent } from './file-upload/file-upload.component';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  selectedTags :string[] = [];
  listOfTags = ["not_funny", "funny", "not_important", "important", "nsfw"];
  selectedOption : any;
  @ViewChild('imageUploader') imageUploader : FileUploadComponent | undefined; 

  constructor() { 
  }

  addNewTag() {
    if(this.selectedOption !== "Choose a tag" && this.selectedTags.indexOf(this.selectedOption) == -1){
      this.selectedTags.push(this.selectedOption);
    }
    var yourSelect = document.getElementById( "selector" ) as HTMLSelectElement;
    yourSelect.selectedIndex = 0;
  }

  ngOnInit(): void {
    this.selectedOption = "Choose a tag";
  }

}
