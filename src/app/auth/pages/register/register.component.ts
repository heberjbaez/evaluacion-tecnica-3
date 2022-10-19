import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailPattern } from 'src/app/posts/shared/validators/validations';
import { AuthService } from '../../services/auth.service';
import { GeoLocationService } from '../../services/geo-location.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phone: [''],
    website: [''],
    adress: [''],
    rol: ['user'],
    uid: [''],
  });

  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private firestore: FirestoreService
  ) {}

  ngOnInit(): void {}

  async signIn() {
    this.loading = true;
    const res = await this.authService
      .registerUser(this.registerForm.value)
      .catch((err) => {
        this.loading = false;
        console.log(err);
        Swal.fire('Error', 'Ops! hubo un error al crear el usuario', 'error');
      });

    if (res) {
      const id = res.user?.uid;
      this.registerForm.value.uid = id;
      this.registerForm.value.password = null;
      await this.firestore.createDoc(this.registerForm.value, 'Users', id!);
      Swal.fire(
        'Usuario creado!',
        'El usuario fue creado con exito',
        'success'
      );
      this.router.navigate(['/auth/login']);
    }
  }

  fieldNotValid(field: string) {
    return (
      this.registerForm.get(field)?.invalid &&
      this.registerForm.get(field)?.touched
    );
  }
}
