import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = 'http://localhost:3000';
  private registerUrl = 'http://localhost:3000';
  usernameEmail: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      this.usernameEmail.next(storedEmail);
    }
  }
  login(email: string, password: string) {
    this.usernameEmail.next(email);
    localStorage.setItem('userEmail', email);
    const body = { email, password };
    return this.http.post<any>(`${this.loginUrl}/login`, body);
  }

  logout() {
    localStorage.removeItem('userEmail');
    this.usernameEmail.next('');
    console.log('User logged out');
  }

  register(
    name: string,
    surname: string,
    phone_number: string,
    email: string,
    password: string,
  ) {
    // console.log({ name, surname, phone_number, email, password });
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
