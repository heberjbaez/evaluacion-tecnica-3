import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        // asyncValidators: this.authService.emailValidator(),
        // updateOn: 'blur',
      }),
      password: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required]),
    },
    this.passwordMatchValidator
  );

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  signUp(): void {
    const newUser = this.registerForm.value;
    console.log(newUser);
  }

  passwordMatchValidator(formCurrent: AbstractControl | FormGroup): any {
    const valuePassword = formCurrent.get('password')?.value;
    const valuePasswordConfirm = formCurrent.get('passwordConfirm')?.value;
    return valuePassword === valuePasswordConfirm ? null : { match: true };
  }
}
