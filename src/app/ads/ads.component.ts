import { Component, OnInit, Input } from '@angular/core';
import {Add} from '../shared/interfaces/add';
import {AdsService} from '../shared/services/ads.service';
import {AuthService} from '../shared/services/auth.service';


@Component({
  selector: 'nwt-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  ads: Add[];
  newAdd: boolean;

  constructor(
    private adsService: AdsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.loadAds();
    this.adsService.currentAdd.subscribe(add => {
      this.newAdd = add;
      if (this.newAdd) {
        // this.loadAds();
      }
    });
  }

  deleteAdd(id: number): void {
    this.adsService.deleteAdd(id).subscribe(
      data => {
        this.ads = data;
      },
      error => {
        console.log(error);
        if (error.status === 401) {
          this.authService.logoutAndRedirect();
        }
      }
    );
  }

  updateAdd(add: Add): void {
    this.adsService.changeForm(add);
  }

  moveUp(add: Add): void {
    const found = this.ads.find((element) => {
      return element.order === add.order;
    });
    const foundNext = this.ads.find((element) => {
      return element.order === add.order - 1;
    });
    if (foundNext) {
      // var b = this.ads[found.order];
      // this.ads[found.order] = this.ads[foundNext.order];
      // this.ads[foundNext.order] = b;
      this.ads[found.order].order = found.order - 1;
      this.ads[foundNext.order].order = foundNext.order + 1;

      this.adsService.saveAds(this.ads).subscribe(
        data => {
          this.loadAds();
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logoutAndRedirect();
          }
        }
      );
    }
  }

  moveDown(add: Add): void {
    const found = this.ads.find((element) => {
      return element.order === add.order;
    });
    const foundPrev = this.ads.find((element) => {
      return element.order === add.order + 1;
    });
    if (foundPrev) {
      // var b = this.ads[found.order];
      // this.ads[found.order] = this.ads[foundPrev.order];
      // this.ads[foundPrev.order] = b;
      this.ads[found.order].order = found.order + 1;
      this.ads[foundPrev.order].order = foundPrev.order - 1;
      this.adsService.saveAds(this.ads).subscribe(
        data => {
          this.loadAds();
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.authService.logoutAndRedirect();
          }
        }
      );
    }
  }

  private loadAds(): void {
    this.adsService.loadAds().subscribe(
      (ads: Add[]) => {
        this.ads = ads;
      },
      error => {
        console.log(error);
        if (error.status === 401) {
          this.authService.logoutAndRedirect();
        }
      }
    );
  }
}
