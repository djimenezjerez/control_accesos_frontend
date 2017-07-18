import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AccesosService } from '../accesos.service';
import { Acceso } from '../acceso';

@Component({
  selector: 'app-accesos',
  templateUrl: './accesos.component.html',
  styleUrls: ['./accesos.component.css']
})
export class AccesosComponent implements OnInit {
  private accesos: Acceso[] = [];
  private nuevoFechaIni: string = new Date().toString();
  private nuevoFechaFin: string = new Date().toString();

  constructor(private accesosService: AccesosService, private datePipe: DatePipe) { }

  public formatearFechas(): any {
    this.nuevoFechaIni = this.datePipe.transform(this.nuevoFechaIni, 'y-MM-ddT00:00:00.000');
    this.nuevoFechaFin = this.datePipe.transform(this.nuevoFechaFin, 'y-MM-ddT23:59:59.999');
  }

  public buscarAccesos() {
    this.formatearFechas();
    this.accesosService.obtenerAccesos([
      {
        parametro: 'fechaInicio',
        valor: this.nuevoFechaIni
      }, {
        parametro: 'fechaFin',
        valor: this.nuevoFechaFin
      }, {
        parametro: 'sort',
        valor: '-fechaHora'
      }
    ]).subscribe(
      accesos => {
        this.accesos = accesos;
      }
    );
  }

  ngOnInit() {
    this.buscarAccesos();
  }
}
