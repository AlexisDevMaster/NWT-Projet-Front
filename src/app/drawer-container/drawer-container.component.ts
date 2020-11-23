import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'nwt-drawer-container',
  templateUrl: './drawer-container.component.html',
  styleUrls: ['./drawer-container.component.css']
})
export class DrawerContainerComponent implements OnChanges {
  @ViewChild('sidenav') public sidenav: MatSidenav;

  @Input()
  openNav: boolean;

  constructor() {
  }

  ngOnChanges(): void {
    if (this.sidenav) {
      if (this.openNav) {
        this.sidenav.open();
      } else {
        this.sidenav.close();
      }
    }
  }
}
