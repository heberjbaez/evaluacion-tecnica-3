import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailPattern } from 'src/app/posts/shared/validators/validations';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  uid!: string;

  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(emailPattern)]],
    phone: [''],
    website: [''],
    adress: [''],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUid();
    this.authService.stateUser().subscribe((res) => {
      console.log('Estado de autenticacion', res);
    });
  }

  async getUid() {
    const uid = await this.authService.getUid();
    if (uid) {
      this.uid = uid;
      console.log(this.uid);
    } else {
      console.log('No existe uid');
    }
  }

  // updateUser() {
  //   this.authService
  //     .editUser(this.registerForm.value)
  //     .subscribe((res) => localStorage.setItem('user', JSON.stringify(res)));
  // }
}
