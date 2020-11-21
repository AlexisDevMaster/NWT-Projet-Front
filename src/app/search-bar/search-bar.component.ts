import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'nwt-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Output()
  open: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  clickMenu(): void {
    this.open.emit(true);
    // console.log("click menu");
    // console.log('header ', this.sidenav)
    // this.sidenav.toggle();
  }
}
