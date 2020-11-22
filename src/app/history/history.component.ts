import { Component, OnInit } from '@angular/core';
import {History} from '../shared/interfaces/history';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {HistoryService} from '../shared/services/history.service';

@Component({
  selector: 'nwt-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  // private property to store histories value
  private _histories: History[];
  // private property to store view value
  private _view: string;

  /**
   * Component constructor
   */
  constructor(private _router: Router, private _historiesService: HistoryService, private _dialog: MatDialog) {
    this._histories = [];
    this._view = 'card';
  }
  /**
   * Returns private property _histories
   */
  get histories(): History[] {
    return this._histories;
  }

  /**
   * Returns private property _view
   */
  get view(): string {
    return this._view;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
    this._historiesService
      .fetch().subscribe((histories: History[]) => this._histories = histories);
  }

  /**
   * Function to navigate to current history
   */
  navigate(id: string): void {
    this._router.navigate([ '/history', id ]);
  }


}
