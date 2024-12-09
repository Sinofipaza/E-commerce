import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtHeaderService {
  constructor() {}
  public token: string | null = localStorage.getItem('token') || '';;

  public createHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (this.token) {
      headers = headers.append('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }
}

