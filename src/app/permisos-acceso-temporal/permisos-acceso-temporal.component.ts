import { Component, OnInit } from '@angular/core';
import { PermisosAccesoService } from '../permisos-acceso.service';
import { PuertasService } from '../puertas.service';
import { PermisoAccesoTemporal } from '../permiso-acceso-temporal';
import { Puerta } from '../puerta';
import { Persona } from '../persona';
import { PersonasService } from '../personas.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-permisos-acceso-temporal',
  templateUrl: './permisos-acceso-temporal.component.html',
  styleUrls: ['./permisos-acceso-temporal.component.css']
})
export class PermisosAccesoTemporalComponent implements OnInit {
  permisosAcceso: PermisoAccesoTemporal[] = [];
  nuevoFechaIni: string;
  nuevoFechaFin: string;
  personas: Persona[] = [];
  puertas: Puerta[] = [];

  constructor(private permisosAccesoService: PermisosAccesoService, private personasService: PersonasService, private puertasService: PuertasService) {
    this.reiniciarNuevoFecha();
  }

  reiniciarNuevoFecha() {
    this.nuevoFechaIni = new Date().toISOString().split('T')[0];
    this.nuevoFechaFin = new Date(new Date().getTime() + (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
  }

  eliminarPermiso(id: number): any {
    this.permisosAccesoService.eliminarPermisoAccesoTemporal(id).subscribe(
      respuesta => {
        if (respuesta) {
          _.remove(this.permisosAcceso, permiso => permiso.id === id);
        }
      }
    );
  }

  actualizarFechaPermiso(id: number, fechaInicio: Date, fechaFin: Date): any {
    this.permisosAccesoService.actualizarFechaPermisoTemporal(id, {
      fechaInicio: fechaInicio,
      fechaFin: fechaFin
    }).subscribe(
      respuesta => { },
      err => {
        this.permisosAccesoService.obtenerPermisosAccesoTemporal([
          {
            parametro: 'scope',
            valor: 'temporalActual'
          }, {
            parametro: 'sort',
            valor: 'fechaFin'
          }
        ]).subscribe(
          permisosAcceso => {
            this.permisosAcceso = permisosAcceso;
          }
        );
      }
    );
  }

  insertarPermiso(persona: number, puerta: number, fechaIni: Date, fechaFin: Date) {
    const fechaAct: string = new Date().toISOString().split('T')[0];
    if (new Date(fechaAct) <= new Date(fechaIni) && new Date(fechaIni) <= new Date(fechaFin)) {
      this.permisosAccesoService.insertarPermisoAcceso({
        persona: persona,
        puerta: puerta,
        fechaInicio: fechaIni,
        fechaFin: fechaFin
      }).subscribe(
        respuesta => {
          if (respuesta) {
            this.permisosAcceso.unshift(respuesta);
          }
        }
      );
    } else {
      this.reiniciarNuevoFecha();
    }
  }

  ngOnInit() {
    this.permisosAccesoService.obtenerPermisosAccesoTemporal([
      {
        parametro: 'scope',
        valor: 'temporalActual'
      }, {
        parametro: 'sort',
        valor: 'fechaFin'
      }
    ]).subscribe(
      permisosAcceso => {
        this.permisosAcceso = permisosAcceso;
      }
    );

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

}
