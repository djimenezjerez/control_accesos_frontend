import { Component, OnInit, EventEmitter } from '@angular/core';
import { SensoresService } from '../sensores.service';
import { ClientesMqttService } from '../clientes-mqtt.service';
import { ProgramasService } from '../programas.service';
import { Sensor } from '../sensor';
import { ClienteMqtt } from '../cliente-mqtt';

import * as _ from 'lodash';
import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'app-arduinos-control',
  templateUrl: './arduinos-control.component.html',
  styleUrls: ['./arduinos-control.component.css']
})
export class ArduinosControlComponent implements OnInit {
  arduinos: Sensor[] = [];
  clientesMqtt: ClienteMqtt[] = [];
  nuevoArduino: any;
  programa: String = '';
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private programasService: ProgramasService, private sensoresService: SensoresService, private clientesMqttService: ClientesMqttService) {
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
      control: true,
      detalle: '',
      pinesSalida: '',
      puerta: null
    };
  };

  buscarArduinos() {
    this.sensoresService.obtenerArduinos([
      {
        parametro: 'scope',
        valor: 'control'
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
    if (dato.pinesSalida) {
      dato.pinesSalida = dato.pinesSalida.split(',').map((item ) => {
        return parseInt(item, 10);
      });
    }

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
    this.nuevoArduino.pinesSalida = this.nuevoArduino.pinesSalida.split(',').map((item ) => {
      return parseInt(item, 10);
    });

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
  }

}
