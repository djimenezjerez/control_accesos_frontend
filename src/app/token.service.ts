import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { SocketService } from './socket.service';

@Injectable()
export class TokenService {
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router, private socketService: SocketService) { }

  verificar(token): boolean {
    if (token != null && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      token = null;
      this.salir();
      return false;
    }
  }

  ingresar(token) {
    localStorage.setItem('token', token);
    const decodificado = this.jwtHelper.decodeToken(token);
    localStorage.setItem('usuario', decodificado.usuario);
    localStorage.setItem('role', decodificado.role);
    this.socketService.conectar();
    this.router.navigate(['/home']);
  }

  salir() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('role');
    this.socketService.desconectar();
    this.router.navigate(['/login']);
  }
}
