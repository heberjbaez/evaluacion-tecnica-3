import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Auth } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  uid!: string;
  userInfo!: Auth;
  registerForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    body: ['', [Validators.required, Validators.maxLength(500)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private firestore: FirestoreService
  ) {}

  ngOnInit(): void {
    this.authService.stateUser().subscribe((res) => {
      this.getUid();
    });
    this.getUid();
  }

  async getUid() {
    const uid = await this.authService.getUid();
    if (uid) {
      this.uid = uid;
      this.getUserData();
    } else {
      console.log('error al obtener los datos del usuario');
    }
  }

  getUserData() {
    const id = this.uid;
    this.firestore.getDoc<Auth>('Users', id).subscribe((res) => {
      if (res) {
        this.userInfo = res;
        this.registerForm.setValue({
          username: res.username,
          imgProfile: res.img,
        });
      }
    });
  }

  updateUserInfo() {
    const username = this.registerForm.value.username;
    const img = this.registerForm.value.imgProfile;
    const id = this.uid;
    const updateDoc = { username: username, img: img };

    this.firestore.updateDoc('Users', id, updateDoc).then(() => {
      // Swal.fire('Datos actualizados');
    });
  }
}
