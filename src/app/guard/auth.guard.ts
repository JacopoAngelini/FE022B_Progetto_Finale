import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private autSrv: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.logged();
  }

  logged(){
    if(this.autSrv.logged()) {
      console.log('permessi accordati')
      return true;
    }
    alert('per accedere a queste risorse devi prima effettuare il login');
    this.router.navigate(['/']);
    return false;
  }
  
}
