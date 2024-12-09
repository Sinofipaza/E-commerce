import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { finalize } from 'rxjs';

/**
 * RegisterComponent is responsible for handling user registration.
 * It uses Reactive Forms to create a form for user input and communicates with the LoginService to register the user.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  registerForm: FormGroup;
  alreadyRegisterd = true;

  constructor(private fb: FormBuilder, public loginService: LoginService) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  };

  /**
   * onSubmit handles the form submission.
   * It checks if the form is valid and then logs the registration data or alerts the user if the form is invalid.
   */
  onSubmit(): void {
    if (this.registerForm.valid) {
      // this.registerForm.disable();
      console.log('Registration data:', this.registerForm.value);
      this.loginService
        .register(
          this.registerForm.value.name,
          this.registerForm.value.surname,
          this.registerForm.value.phone,
          this.registerForm.value.email,
          this.registerForm.value.password,
        )
        .subscribe( {
          next: (data: any) => {
            console.log(data);
            alert("User registered successfully!")
          },
          error: (error: any) => {
            alert("User already registered")
          }

        });
    } else {
      alert('Form is invalid. Please check your inputs.');
    }
  }
}

