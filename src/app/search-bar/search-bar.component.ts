import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'nwt-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Output()
  open: EventEmitter<boolean> = new EventEmitter();
  constructor(private _authService: AuthService) {  }

  ngOnInit(): void {
  }

  clickMenu(): void {
    this.open.emit(true);
  }

  isLogedIn(): boolean {
    // return false;
    return this._authService.hasStoredToken();
  }

  getUsername(): string{
    return this._authService.getUsernameStored();
  }

  logout(): void {
    return this._authService.logoutAndRedirect();
  }

}
