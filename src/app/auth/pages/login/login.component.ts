import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Auth } from '../../interfaces/auth.interface';
import { EmailValidatorService } from '../../services/email-validator.service';
import { emailPattern } from 'src/app/posts/shared/validators/validations';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(emailPattern)]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private emailValidator: EmailValidatorService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {}

  logIn() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.afAuth.signInWithEmailAndPassword(email, password).then((res) => {
      localStorage.setItem('user', JSON.stringify(res));
      this.router.navigate(['/posts/list']);
    });
  }
}
