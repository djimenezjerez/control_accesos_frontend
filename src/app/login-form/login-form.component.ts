import { Component, OnInit } from '@angular/core';
import { LoginFormService } from '../login-form.service';
import { Usuario } from '../usuario';
import { Error } from '../error';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent {

  constructor(private loginFormService: LoginFormService, private usuario: Usuario, private tokenService: TokenService, private error: Error) {
    this.usuario.nombre = '';
    this.usuario.clave = '';
    this.error.valor = false;
    this.error.mensaje = '';
  }

  autenticar() {
    this.loginFormService.autenticar({
      usuario: this.usuario.nombre,
      clave: this.usuario.clave
    }).subscribe(
      res => {
        if (res.token) {
          this.tokenService.ingresar(res.token);
        } else {
          this.errorAutenticacion();
        }
      }, () => {
        this.errorAutenticacion();
      }
    );
  }

  private errorAutenticacion() {
    this.error.valor = true;
    this.error.mensaje = 'Usuario o contraseña incorrecta';
    this.usuario.clave = '';
  }
}
