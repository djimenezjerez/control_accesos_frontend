import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import configuracion from './configuracion.json';

@Injectable()
export class SocketService {
  url: string;
  socket;

  constructor() {
    this.url = `${(configuracion.sslSocket) ? 'wss' : 'ws'}://${configuracion.servidorSocket}:${configuracion.puertoSocket}`;
  }

  conectar() {
    this.socket = io.connect(this.url, {
      secure: true,
      query: {
        auth_token: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return true;
  }

  suscribir(canal: string): any {
    const observable = new Observable(observer => {
      this.socket.on(canal, (dato) => {
        observer.next(dato);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  desconectar() {
    if (this.socket !== undefined) {
      this.socket.disconnect();
    }
  }
}
