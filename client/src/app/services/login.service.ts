import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginToken } from '../types/LoginToken.interface';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = environment.SERVER;
  private registerUrl = environment.SERVER;
  token: LoginToken = {};
  usernameEmail: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient,private router: Router) {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      this.usernameEmail.next(storedEmail);
    }
  }
  login(email: string, password: string) {
    this.usernameEmail.next(email);
    const body = { email, password };
    return this.http.post<any>(`${this.loginUrl}/login`, body);
  }

  logout() {
    localStorage.removeItem('token');
    this.usernameEmail.next('');
    this.router.navigate(['']).then(() => {
      window.location.reload();
    })
  }

  register(
    name: string,
    surname: string,
    phone_number: string,
    email: string,
    password: string,
  ) {
    const body = { name, surname, phone_number, email, password };
    return this.http.post<any>(`${this.registerUrl}/register`, body);
  }

  updateUser(
    id: string,
    updates: { name?: string; email?: string; phone_number?: string },
  ) {
    return this.http.post<any>(`${this.loginUrl}/users/${id}`, updates);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.loginUrl}/users/${id}`);
  }
}
