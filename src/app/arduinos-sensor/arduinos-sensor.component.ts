import { Component, OnInit, EventEmitter } from '@angular/core';
import { SensoresService } from '../sensores.service';
import { ClientesMqttService } from '../clientes-mqtt.service';
import { PuertasService } from '../puertas.service';
import { ProgramasService } from '../programas.service';
import { Sensor } from '../sensor';
import { Puerta } from '../puerta';
import { ClienteMqtt } from '../cliente-mqtt';

import * as _ from 'lodash';
import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'app-arduinos-sensor',
  templateUrl: './arduinos-sensor.component.html',
  styleUrls: ['./arduinos-sensor.component.css']
})
export class ArduinosSensorComponent implements OnInit {
  arduinos: Sensor[] = [];
  clientesMqtt: ClienteMqtt[] = [];
  puertas: Puerta[] = [];
  nuevoArduino: any;
  programa: String = '';
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private programasService: ProgramasService, private sensoresService: SensoresService, private clientesMqttService: ClientesMqttService, private puertasService: PuertasService) {
    this.reiniciarNuevoArduino();
  }

  openModal() {
    this.modalActions.emit({
      action: 'modal',
      params: ['open']
    });
  }

  closeModal() {
    this.modalActions.emit({
      action: 'modal',
      params: ['close']
    });
  }

  pedirPrograma(id: number): any {
    this.programasService.obtenerProgramas(id).subscribe(
      programa => {
        this.programa = programa;
      },
      err => {
        console.error(err);
      }
    );
  }

  reiniciarNuevoArduino() {
    this.nuevoArduino = {
      mac: '',
      ip: '',
      control: false,
      detalle: '',
      puerta: null
    };
  };

  buscarArduinos() {
    this.sensoresService.obtenerArduinos([
      {
        parametro: 'scope',
        valor: 'sensor'
      }, {
        parametro: 'sort',
        valor: 'id'
      }
    ]).subscribe(
      arduinos => {
        this.arduinos = arduinos;
      }
    );
  }

  actualizarArduino(id: number, dato: any): any {
    this.sensoresService.actualizarArduino(id, dato).subscribe(
      respuesta => {
        console.log('Sensor actualizado');
      },
      err => {
        this.buscarArduinos();
      }
    );
  }

  eliminarArduino(id: number): any {
    this.sensoresService.eliminarArduino(id).subscribe(
      respuesta => {
        if (respuesta) {
          _.remove(this.arduinos, arduino => arduino.id === id);
        }
      }
    );
  }

  insertarArduino() {
    this.sensoresService.insertarArduino(this.nuevoArduino)
    .subscribe(
      respuesta => {
        if (respuesta) {
          this.arduinos.unshift(respuesta);
          this.reiniciarNuevoArduino();
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  ngOnInit() {
    this.buscarArduinos();

    this.clientesMqttService.obtenerClientesMqtt([
      {
        parametro: 'sort',
        valor: 'id'
      }, {
        parametro: 'admin',
        valor: 'false'
      }
    ]).subscribe(
      clientes => {
        this.clientesMqtt = clientes;
      }
    );

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
  }

}
