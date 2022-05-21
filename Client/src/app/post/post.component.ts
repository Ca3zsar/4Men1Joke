import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  post_form :FormGroup;
  validationError : boolean = false;

  @ViewChild('imageUploader') imageUploader : FileUploadComponent | undefined; 

  constructor(fb: FormBuilder) { 
    this.post_form = fb.group({
      "title": [null, Validators.compose([Validators.required])],
      "content": [null, Validators.compose([Validators.required])]
    });
  }

  addNewTag() {
    if(this.selectedOption !== "Choose a tag" && this.selectedTags.indexOf(this.selectedOption) == -1){
      this.selectedTags.push(this.selectedOption);
    }
    var yourSelect = document.getElementById( "selector" ) as HTMLSelectElement;
    yourSelect.selectedIndex = 0;
  }

  submitPost(){
    this.markFormTouched(this.post_form);
    if (this.post_form.valid && this.selectedTags.length > 0) {
      var formValues = this.post_form.getRawValue();
      console.log(formValues);
    }else{
      if(this.selectedTags.length == 0)
      {
        this.validationError = true;
      }else{
        this.validationError = false;
      }
      console.log("cacat");
    }
  }

  markFormTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = (group.controls as any)[key ];
      if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control); }
      else { control.markAsTouched(); };
    });
  };

  ngOnInit(): void {
    this.selectedOption = "Choose a tag";
  }

}
