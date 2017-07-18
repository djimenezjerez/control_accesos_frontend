import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { TokenService } from './token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  autenticado: Boolean = false;

  constructor(private tokenService: TokenService, private router: Router) {
    this.verificarToken();

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.verificarToken();
      }
    });
  }

  verificarToken() {
    this.autenticado = this.tokenService.verificar(localStorage.getItem('token'));
  }
}
