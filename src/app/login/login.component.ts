import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'nwt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  error = false;

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get usernameControl(): FormControl {
    return this.form.get('username') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  login(form: FormGroup): void {
    this.submitted = true;
    const { value, valid } = form;
    if (valid) {
      this.authService.login(value.username, value.password).subscribe(
        data => {
          const url = '/home';
          this.router.navigate([url]);
        },
        error => {
          this.error = true;
          console.log(error);
        }
      );
    }
  }
}
