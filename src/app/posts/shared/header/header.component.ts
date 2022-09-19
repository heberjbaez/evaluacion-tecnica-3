import { Component, OnInit } from '@angular/core';
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
    if (sessionStorage.getItem('user')) {
      this.loadUser();
    }
  }

  loadUser() {
    const user = JSON.parse(sessionStorage.getItem('user')!);
    this.userName = user[0].name;
  }

  logOut() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/', 'auth', '/login']);
  }
}
