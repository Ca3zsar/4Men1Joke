import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatCheckboxModule } from '@angular/material/checkbox';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  author : string = '';

  tags = [
    "funny", "very funny", "serious", "cringe"
  ];

  selectedItems = [

  ];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
  };

  @Output() emitter: EventEmitter<string>
    = new EventEmitter<string>();

  emit() {
    this.emitter.emit(this.author);
  }

  checkKey(event : any){
    this.author = event.target.value;
    this.emit();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
