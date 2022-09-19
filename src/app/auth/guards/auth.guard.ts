import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private cookie = localStorage.getItem('user');

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this.checkCookie();
  }

  private checkCookie(): boolean {
    if (this.cookie !== null) {
      return true;
    } else {
      this.router.navigate(['/', 'auth', '/login']);
      return false;
    }
  }
}
