import { Component, OnInit } from '@angular/core';
import { ClientesMqttService } from '../clientes-mqtt.service';
import { ClienteMqtt } from '../cliente-mqtt';

import * as _ from 'lodash';

@Component({
  selector: 'app-clientes-mqtt',
  templateUrl: './clientes-mqtt.component.html',
  styleUrls: ['./clientes-mqtt.component.css']
})
export class ClientesMqttComponent implements OnInit {
  clientesMqtt: ClienteMqtt[] = [];
  nuevoCliente: any;

  constructor(private clientesMqttService: ClientesMqttService) {
    this.reiniciarNuevoCliente();
  }

  reiniciarNuevoCliente() {
    this.nuevoCliente = {
      usuario: '',
      clave: '',
      admin: false
    };
  };

  buscarClientes() {
    this.clientesMqttService.obtenerClientesMqtt().subscribe(
      clientesMqtt => {
        this.clientesMqtt = clientesMqtt;
      }
    );
  }

  actualizarCliente(id: number, dato: any): any {
    this.clientesMqttService.actualizarClienteMqtt(id, dato).subscribe(
      respuesta => {
        console.log('Cliente MQTT actualizado');
        this.buscarClientes();
      },
      err => {
        this.buscarClientes();
      }
    );
  }

  eliminarCliente(id: number): any {
    this.clientesMqttService.eliminarClienteMqtt(id).subscribe(
      respuesta => {
        if (respuesta) {
          _.remove(this.clientesMqtt, cliente => cliente.id === id);
        }
      }
    );
  }

  insertarCliente() {
    if (this.nuevoCliente.clave === '') {
      this.nuevoCliente.clave = this.nuevoCliente.usuario;
    };

    this.clientesMqttService.insertarClienteMqtt(this.nuevoCliente)
    .subscribe(
      respuesta => {
        if (respuesta) {
          this.clientesMqtt.unshift(respuesta);
          this.reiniciarNuevoCliente();
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  ngOnInit() {
    this.buscarClientes();
  }

}
