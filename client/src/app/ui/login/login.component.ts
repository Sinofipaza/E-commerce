import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email && !emailPattern.test(email)) {
      return { invalidEmail: true }; 
    }
    return null; 
  };
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userDetails = {
    email: '',
    password: ''
  }

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    //this initializes the form
    this.loginForm = this.fb.group({
      email: new FormControl ('', [Validators.required, emailValidator()]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() : void {
    if (this.loginForm.valid) {
    alert('Form submitted successfully');
    } else {
      alert('Form is invalid');
    }
  }
}
