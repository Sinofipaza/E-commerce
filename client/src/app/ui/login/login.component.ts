import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public loginService: LoginService,
    public router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Handles the submission of the login form.
   * If the form is valid, it sends a login request to the server using the provided email and password.
   * On successful login, it stores the token in local storage and navigates to the products page.
   * On error, it displays an alert message.
   * If the form is invalid, it displays a generic alert message.
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value.email, +" " + this.loginForm.value.password);
      this.loginService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: (data: any) => {
            // console.log(data.token);
            localStorage.setItem('token', JSON.stringify(data.token));

            this.router.navigate(['/products']);
          },
          error: (error: any) => {
            alert('Invalid username or password');
          },
        });
    } else {
      alert('Form is invalid');
    }
  }
}
