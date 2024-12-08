import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule, FormsModule } from '@angular/forms';
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
      console.log(this.loginForm.value.email, +" " + this.loginForm.value.password);
      try {
        this.loginService
          .login(this.loginForm.value.email, this.loginForm.value.password).subscribe((response) => {
            console.log('Success');
          });
        this.router.navigate(['/products']);
      } catch (error){
          alert("Invalid name or password")
      }
      
      
      // alert('Form submitted successfully');
      
    } else {
      alert('Form is invalid');
    }
  }
}
