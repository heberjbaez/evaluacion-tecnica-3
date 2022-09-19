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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.pattern(emailPattern)],
      [this.emailValidator],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private emailValidator: EmailValidatorService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  logIn(email: string) {
    this.authService.getUser(email).subscribe({
      next: (res) => {
        sessionStorage.setItem('user', JSON.stringify(res));
        this.route.navigate(['/', 'posts', '/list']);
      },
    });
  }
}
