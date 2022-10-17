import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userName: string = '';
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.loadUser();
    }
  }

  loadUser() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.userName = user.user.email;
  }

  logOut() {
    localStorage.removeItem('user');
    this.router.navigate(['/', 'auth', '/login']);
  }

  edit() {
    this.router.navigate(['/auth/edit-user']);
  }
}
