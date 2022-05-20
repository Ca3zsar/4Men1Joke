import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  selectedTags :string[] = [];
  listOfTags = ["not_funny", "funny", "not_important", "important", "nsfw"];
  selectedOption : any;
  defaultValue = true;

  constructor() { }

  addNewTag(){
    console.log("AICI");
    if(this.selectedOption !== "Choose a tag" && this.selectedTags.indexOf(this.selectedOption) == -1){
      this.selectedTags.push(this.selectedOption);
    }
    this.selectedOption = "Choose a tag";
  }

  ngOnInit(): void {
    this.selectedOption = "Choose a tag";
  }

}
