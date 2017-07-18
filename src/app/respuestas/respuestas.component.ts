import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RespuestasService } from '../respuestas.service';
import { Respuesta } from '../respuesta';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.css']
})
export class RespuestasComponent implements OnInit {
  private respuestas: Respuesta[] = [];
  private nuevoFechaIni: string = new Date().toString();
  private nuevoFechaFin: string = new Date().toString();

  constructor(private respuestasService: RespuestasService, private datePipe: DatePipe) { }

  public formatearFechas(): any {
    this.nuevoFechaIni = this.datePipe.transform(this.nuevoFechaIni, 'y-MM-ddT00:00:00.000');
    this.nuevoFechaFin = this.datePipe.transform(this.nuevoFechaFin, 'y-MM-ddT23:59:59.999');
  }

  public buscarRespuestas() {
    this.formatearFechas();
    this.respuestasService.obtenerRespuestas([
      {
        parametro: 'fechaInicio',
        valor: this.nuevoFechaIni
      }, {
        parametro: 'fechaFin',
        valor: this.nuevoFechaFin
      }, {
        parametro: 'sort',
        valor: 'createdAt'
      }
    ]).subscribe(
      respuestas => {
        this.respuestas = respuestas;
      }
    );
  }

  ngOnInit() {
    this.buscarRespuestas();
  }
}
