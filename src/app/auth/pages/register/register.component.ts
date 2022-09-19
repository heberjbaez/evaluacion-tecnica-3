import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { emailPattern } from 'src/app/posts/shared/validators/validations';
import { AuthService } from '../../services/auth.service';
import { GeoLocationService } from '../../services/geo-location.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(emailPattern)]],
    phone: [''],
    website: [''],
    adress: [''],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private geoLocation: GeoLocationService
  ) {}

  ngOnInit(): void {}

  signUp(): void {
    const newUser = this.registerForm.value;
    console.log(newUser);
  }
}
