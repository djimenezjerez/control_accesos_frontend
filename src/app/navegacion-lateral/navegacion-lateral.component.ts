import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-navegacion-lateral',
  templateUrl: './navegacion-lateral.component.html',
  styleUrls: ['./navegacion-lateral.component.css']
})
export class NavegacionLateralComponent {
  isAdmin: Boolean = false;

  constructor(private tokenService: TokenService) {
    this.isAdmin = (localStorage.getItem('role') === 'admin') ? true : false;
  }

  salir() {
    this.tokenService.salir();
  }
}
