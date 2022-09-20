import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Login } from '../interfaces/login.interface';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class EmailValidatorService implements AsyncValidator {
  private apiUrl: string = 'https://heber-baez-endpoint.herokuapp.com';

  constructor(private http: HttpClient) {}
  validate(
    control: AbstractControl<any, any>
  ): Observable<ValidationErrors | null> {
    const email = control.value;
    const url = `${this.apiUrl}/users?q=${email}`;
    return this.http.get<Auth[]>(url).pipe(
      map((res) => {
        return res.length !== 0 ? null : { emailValid: true };
      })
    );
  }
}
