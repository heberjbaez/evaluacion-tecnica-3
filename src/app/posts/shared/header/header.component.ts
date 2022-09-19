import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userName: string = '';
  constructor() {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.userName = user[0].name;
  }
}
