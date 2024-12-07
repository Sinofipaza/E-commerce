import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';


import { LoginService } from '../../services/login.service';

// function emailValidator(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const email = control.value;
//     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//     if (email && !emailPattern.test(email)) {
//       return { invalidEmail: true }; 
//     }
//     return null; 
//   };
// }

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  loginForm: FormGroup;

   constructor(private fb: FormBuilder, public loginService: LoginService, public router:Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() : void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value.email,+" "+ this.loginForm.value.password);
      this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((response) => {})
      alert('Form submitted successfully');
      this.router.navigate(['/products']);
    } else {
      alert('Form is invalid');
    }
  }
}
