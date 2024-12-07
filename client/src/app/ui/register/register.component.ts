import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, public loginService: LoginService) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),Validators.pattern('^([A-Z])([a-z])([0-9]).+$') // At least 1 uppercase, 1 lowercase, 1 digit
]],
    });
  };

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Registration data:', this.registerForm.value);
      this.loginService.register(this.registerForm.value.name, this.registerForm.value.surname, this.registerForm.value.phone, this.registerForm.value.email, this.registerForm.value.password).subscribe((response) => {})
      alert('Registration successful!');
    } else {
      alert('Form is invalid. Please check your inputs.');
    }
  }
}

