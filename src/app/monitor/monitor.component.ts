import { Component, OnInit, OnDestroy } from '@angular/core';
import { PuertasService } from '../puertas.service';
import { AccesosService } from '../accesos.service';
import { Puerta } from '../puerta';
import { Acceso } from '../acceso';
import { SocketService } from '../socket.service';
import { TokenService } from '../token.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit, OnDestroy {
  isAdmin: Boolean = false;
  puertas: Puerta[] = [];
  accesos: Acceso[] = [];
  conexionSocket;

  constructor(private puertasService: PuertasService, private accesosService: AccesosService, private socketService: SocketService, private tokenService: TokenService) {
    this.isAdmin = (localStorage.getItem('role') === 'admin') ? true : false;
  }

  abrirPuerta(idPuerta: number) {
    this.puertasService.abrirPuerta({
      puerta: idPuerta
    }).subscribe(
      respuesta => {
        console.log(JSON.stringify(respuesta, null, 2));
      },
      (err) => {
        console.error(err);
      }
    );
  }

  ngOnInit() {
    this.puertasService.obtenerPuertas([
      {
        parametro: 'sort',
        valor: 'id'
      }
    ]).subscribe(
      puertas => {
        this.puertas = puertas;
      },
      (err) => {
        console.error(err);
      }
    );

    if (this.isAdmin) {
      this.accesosService.obtenerAccesos([
        {
          parametro: 'offset',
          valor: '0'
        }, {
          parametro: 'count',
          valor: '10'
        }, {
          parametro: 'sort',
          valor: '-id'
        }
      ]).subscribe(
        accesos => {
          this.accesos = accesos;
        }
      );
    }

    if (this.tokenService.verificar(localStorage.getItem('token'))) {
      this.socketService.conectar();

      this.conexionSocket = this.socketService.suscribir('gpio').subscribe(mensaje => {
        const puerta = _.find(this.puertas, {
          id: mensaje.id
        });
        puerta.estadoActual = mensaje.estadoActual;
        puerta.updatedAt = new Date();
      });

      this.conexionSocket = this.socketService.suscribir('accesos').subscribe(mensaje => {
        if (mensaje instanceof Object) {
          if (this.accesos.length > 10) {
            this.accesos.pop();
          }
          this.accesos.unshift(mensaje);
        };
      });
    }
  }

  ngOnDestroy() {
    this.conexionSocket.unsubscribe();
  }

}
