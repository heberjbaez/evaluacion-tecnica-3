import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { Auth } from '../interfaces/auth.interface';
import { Response } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'https://heber-baez-endpoint.herokuapp.com';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Auth[]> {
    const url = `${this.apiUrl}/users`;
    return this.http.get<Auth[]>(url);
  }

  loginByUsername(form: Auth): Observable<Response> {
    const url = `${this.apiUrl}/users`;
    return this.http.post<Response>(url, form);
  }
}
