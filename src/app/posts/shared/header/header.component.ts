import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { FirestoreService } from '../../../auth/services/firestore.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  token: boolean = false;
  currentRoute: string = '';
  login: boolean = false;
  rol!: 'user' | 'admin';
  userName!: string;
  constructor(
    private router: Router,
    private authService: AuthService,
    private firestore: FirestoreService
  ) {
    this.authService.stateUser().subscribe((res) => {
      if (res) {
        this.login = true;
        this.getUserData(res.uid);
      } else {
        this.login = false;
      }
    });

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.currentRoute = e.url;
      }
    });

    if (localStorage.getItem('token')) {
      this.token = true;
    }
  }

  ngOnInit(): void {}

  logOut() {
    localStorage.removeItem('token');
    this.authService.logOut();
    Swal.fire('Sesion finalizada');
    this.router.navigate(['/', 'auth', '/login']);
  }

  edit() {
    this.router.navigate(['/auth/edit-user']);
  }

  getUserData(uid: string) {
    const id = uid;
    this.firestore.getDoc<Auth>('Users', id).subscribe((res) => {
      if (res) {
        this.rol = res.rol;
        this.userName = res.name;
      }
    });
  }
}
