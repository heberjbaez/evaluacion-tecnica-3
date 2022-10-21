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
import Swal from 'sweetalert2';

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

    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        Swal.fire('Bienvenido!');

        this.router.navigate(['/posts/list']);

        const token = res.user?.uid;
        localStorage.setItem('token', JSON.stringify(token));

        this.authService.getUser().subscribe((res) => {});
      })
      .catch(() => {
        Swal.fire('Error', 'El usuario no existe!', 'error');
      });
  }

  fieldNotValid(field: string) {
    return (
      this.loginForm.get(field)?.invalid && this.loginForm.get(field)?.touched
    );
  }
}
