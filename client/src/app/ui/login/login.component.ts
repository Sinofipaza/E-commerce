import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
<<<<<<< HEAD
import { LoginService } from '../../services/login.service';
=======
>>>>>>> 430121b (rebasing)

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

   constructor(private fb: FormBuilder, public loginService: LoginService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() : void {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((response) => {})
    alert('Form submitted successfully');
    } else {
      alert('Form is invalid');
    }
  }
}
