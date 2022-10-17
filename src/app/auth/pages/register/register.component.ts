import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailPattern } from 'src/app/posts/shared/validators/validations';
import { AuthService } from '../../services/auth.service';
import { GeoLocationService } from '../../services/geo-location.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(emailPattern)]],
    password: ['', [Validators.required]],
    phone: [''],
    website: [''],
    adress: [''],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private geoLocation: GeoLocationService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {}

  signUp(): void {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;

    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.registerForm.reset();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
