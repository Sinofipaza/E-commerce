import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = 'http://localhost:3000';
  private registerUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) {
    
  }
  login(email: string, password:string) {
    const body = { email, password };
    return this.http.get<any>('${this.loginUrl}/login');
  }

  register(name: string, surname: string, phone_number: string, email: string, password: string) {
    console.log({name, surname, phone_number, email, password});
    const body = { name, surname, phone_number, email, password };
    return this.http.post<any>(`${this.registerUrl}/register`, body);
}

updateUser(id: string, updates: { name?: string; email?: string; phone_number?: string}) {
  return this.http.post<any>(`${this.loginUrl}/users/${id}`, updates);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.loginUrl}/users/${id}`);
  }
}
