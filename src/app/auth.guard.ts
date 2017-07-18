import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TokenService } from './token.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.tokenService.verificar(localStorage.getItem('token'));
  }
}
