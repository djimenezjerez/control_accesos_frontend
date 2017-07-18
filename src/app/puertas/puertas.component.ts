import { Component, OnInit } from '@angular/core';
import { PuertasService } from '../puertas.service';
import { SensoresService } from '../sensores.service';
import { Puerta } from '../puerta';
import { Sensor } from '../sensor';

import * as _ from 'lodash';

@Component({
  selector: 'app-puertas',
  templateUrl: './puertas.component.html',
  styleUrls: ['./puertas.component.css']
})
export class PuertasComponent implements OnInit {
  arduinos: Sensor[] = [];
  puertas: Puerta[] = [];
  nuevaPuerta: any;
  arduinoControl: any = {
    pinesSalida: []
  };

  constructor(private sensoresService: SensoresService, private puertasService: PuertasService) {
    this.reiniciarNuevaPuerta();
  }

  cambiarArduinoControl(id: number) {
    this.arduinoControl = this.arduinos[_.findIndex(this.arduinos, (arduino) => {
      return arduino.id === Number(id);
    })];
    this.nuevaPuerta.pin = null;
  }

  reiniciarNuevaPuerta() {
    this.nuevaPuerta = {
      nombre: '',
      detalle: '',
      estadoInicial: true,
      arduinoControl: 0,
      pin: 0
    };
  };

  buscarPuertas() {
    this.puertasService.obtenerPuertas([
      {
        parametro: 'sort',
        valor: 'id'
      }
    ]).subscribe(
      puertas => {
        this.puertas = puertas;
      }
    );
  }

  actualizarPuerta(id: number, dato: any): any {
    this.puertasService.actualizarPuerta(id, dato).subscribe(
      respuesta => {
        console.log('Puerta actualizada');
        this.buscarPuertas();
      },
      err => {
        console.error(err);
      }
    );
  }

  eliminarPuerta(id: number): any {
    this.puertasService.eliminarPuerta(id).subscribe(
      respuesta => {
        if (respuesta) {
          _.remove(this.puertas, puerta => puerta.id === id);
        }
      }
    );
  }

  insertarPuerta() {
    this.nuevaPuerta.estadoActual = this.nuevaPuerta.estadoInicial;

    this.puertasService.insertarPuerta(this.nuevaPuerta)
    .subscribe(
      respuesta => {
        if (respuesta) {
          this.puertas.unshift(respuesta);
          this.reiniciarNuevaPuerta();
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  ngOnInit() {
    this.buscarPuertas();

    this.sensoresService.obtenerArduinos([
      {
        parametro: 'sort',
        valor: 'id'
      }, {
        parametro: 'scope',
        valor: 'control'
      }
    ]).subscribe(
      arduinos => {
        this.arduinos = arduinos;
        if (arduinos.length > 0) {
          this.arduinoControl = arduinos[0];
        }
        this.arduinos.forEach((arduino) => {
          delete arduino['ClienteMqtt'];
          delete arduino['PuertaSensor'];
          delete arduino['PuertaControl'];
        });
      }
    );
  }
}
