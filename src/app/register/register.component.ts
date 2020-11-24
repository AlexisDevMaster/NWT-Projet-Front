import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'nwt-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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

  register(form: FormGroup): void {
    this.submitted = true;
    const { value, valid } = form;
    if (valid) {
      this.authService.register(value.username, value.password).subscribe(
        data => {
          this.form.reset();
          this.submitted = false;
        },
        error => {
          this.error = true;
        }
      );
    }
  }
}
