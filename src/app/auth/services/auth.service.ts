import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { Auth } from '../interfaces/auth.interface';

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

  // emailValidator(): AsyncValidatorFn {
  //   return (control: AbstractControl): Observable<ValidationErrors | null> => {
  //     return of(control.value).pipe(
  //       map((email) => {
  //         // const users = `${this.apiUrl}/users`;
  //         const emails = ['heberjbaez@gmail.com', 'jose_mb43@hotmail.com'];
  //         return emails.includes(email);
  //       }).pipe(map((exists) => (exists ? { emailExists: true } : null)))
  //     );
  //   };
  // }
}
