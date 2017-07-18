import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from '../persona';
import { PersonasService } from '../personas.service';
import { MicroservicioPersonasService } from '../microservicio-personas.service';
import { HuellasService } from '../huellas.service';
import { SocketService } from '../socket.service';
import { TokenService } from '../token.service';

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import * as Materialize from 'angular2-materialize';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit, OnDestroy {
  personas: Persona[] = [];
  btnSincronizar: {
    texto: string;
    deshabilitado: boolean;
  } = {
    texto: 'Forzar sincronización',
    deshabilitado: false
  };
  btnDesactivado: Boolean = false;
  conexionSocket;
  imagen: null;
  Respuesta: {
    mensaje: string,
    error: boolean
  };

  constructor(private router: Router, private sanitizer: DomSanitizer, private personasService: PersonasService, private microservicioPersonas: MicroservicioPersonasService, private huellas: HuellasService, private socketService: SocketService, private tokenService: TokenService) { }

  mostrarHuella(id: number): any {
    this.huellas.verificarImagen(id).subscribe(
      url => {
        window.open(`${url}/${id}?token=${localStorage.getItem('token')}`);
      },
      err => {
        console.error(err);
        Materialize.toast('Huella no registrada', 4000, 'red accent-2');
      }
    );
  }

  sincronizarMicroservicio() {
    this.microservicioPersonas.sincronizarUsuarios().subscribe(
      respuesta => {
        this.btnSincronizar = {
          texto: 'Sincronizando',
          deshabilitado: true
        };
        setTimeout(() => {
          location.reload();
        }, 1000);
      },
      err => {
        console.error(err);
      }
    );
  }

  grabarHuella(dato) {
    this.btnDesactivado = true;
    Materialize.toast('Coloque su huella en el sensor', 4000, 'green');
    setTimeout(() => {
      Materialize.toast('Esperando datos del sensor', 4000, 'green');
    }, 8000);
    this.huellas.grabar(dato).subscribe(
      respuesta => {
        Materialize.toast(respuesta.mensaje, 4000, (respuesta.error ? 'red accent-2' : 'green'));
        this.btnDesactivado = false;
        this.buscarPersonas();
      },
      (err) => {
        console.error(err);
        Materialize.toast(err.mensaje, 4000, (err.error ? 'red accent-2' : 'green'));
        this.btnDesactivado = false;
        this.buscarPersonas();
      }
    );
  }

  enviarHuella(id: number) {
    this.btnDesactivado = true;
    this.huellas.enviar({
      destino: 0,
      huellas: [id]
    }).subscribe(
      respuesta => {
        Materialize.toast(respuesta.mensaje, 4000, 'green');
        this.buscarPersonas();
      },
      (err) => {
        console.error(err);
        Materialize.toast(err.mensaje, 4000, (err.error ? 'red accent-2' : 'green'));
        this.buscarPersonas();
      }
    );
  }

  borrarHuella(id: number) {
    this.btnDesactivado = true;
    Materialize.toast('Borrando huella', 4000, 'orange');
    this.huellas.borrar({
      destino: 0,
      huellas: [id]
    }).subscribe(
      respuesta => {
        Materialize.toast(respuesta.mensaje, 4000, 'green');
      },
      (err) => {
        Materialize.toast(err.mensaje, 4000, (err.error ? 'red accent-2' : 'green'));
        console.error(err);
      }
    );
  }

  buscarPersonas() {
    this.personasService.obtenerPersonas([
      {
        parametro: 'sort',
        valor: 'nombre'
      }, {
        parametro: 'count',
        valor: '1000'
      }
    ]).subscribe(
      personas => {
        this.personas = personas;
      }
    );
  }

  ngOnInit() {
    this.buscarPersonas();

    if (this.tokenService.verificar(localStorage.getItem('token'))) {
      this.socketService.conectar();

      this.conexionSocket = this.socketService.suscribir('comandos').subscribe(mensaje => {
        if (!mensaje.error) {
          this.btnDesactivado = false;
          this.personasService.obtenerPersonas([
            {
              parametro: 'sort',
              valor: 'nombre'
            }, {
              parametro: 'count',
              valor: '1000'
            }
          ]).subscribe(
            personas => {
              this.personas = personas;
            }
          );
        }
        Materialize.toast(mensaje.mensaje, 4000, (mensaje.error ? 'red accent-2' : 'green'));
      });

      this.conexionSocket = this.socketService.suscribir('monitorMicroservicio').subscribe(mensaje => {
        if (!mensaje.error) {
          this.btnSincronizar = {
            texto: 'Forzar sincronización',
            deshabilitado: false
          };
        }
        Materialize.toast(mensaje.mensaje, 4000, (mensaje.error ? 'red accent-2' : 'green'));
      });
    }
  }

  ngOnDestroy() {
    this.conexionSocket.unsubscribe();
  }
}
