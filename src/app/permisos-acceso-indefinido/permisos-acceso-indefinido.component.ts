import { Component, OnInit } from '@angular/core';
import { PermisosAccesoService } from '../permisos-acceso.service';
import { PuertasService } from '../puertas.service';
import { PersonasService } from '../personas.service';
import { PermisoAccesoIndefinido } from '../permiso-acceso-indefinido';
import { Puerta } from '../puerta';
import { Persona } from '../persona';

import * as _ from 'lodash';

@Component({
  selector: 'app-permisos-acceso-indefinido',
  templateUrl: './permisos-acceso-indefinido.component.html',
  styleUrls: ['./permisos-acceso-indefinido.component.css']
})
export class PermisosAccesoIndefinidoComponent implements OnInit {
  permisosAcceso: PermisoAccesoIndefinido[] = [];
  puertas: Puerta[] = [];
  personas: Persona[] = [];

  constructor(private permisosAccesoService: PermisosAccesoService, private puertasService: PuertasService, private personasService: PersonasService) { }

  insertarPermiso(e, persona: number, puerta: number) {
    e.target.checked = false;
    this.permisosAccesoService.insertarPermisoAcceso({
      persona: persona,
      puerta: puerta,
      fechaInicio: new Date(),
      fechaFin: null
    }).subscribe(
      respuesta => {
        if (respuesta) {
          this.permisosAccesoService.obtenerPermisosAccesoIndefinido().subscribe(
            permisosAcceso => {
              this.permisosAcceso = permisosAcceso;
              _.remove(this.personas, p => p.id === Number(persona));
            }
          );
        }
      }
    );
  }

  cambiarPermiso(permiso: boolean, puerta: number, persona: number) {
    const idPermisoAcceso = _.indexOf(_.map(this.permisosAcceso, 'persona'), persona);
    const idPuerta = _.indexOf(_.map(this.permisosAcceso[idPermisoAcceso].puertas, 'puerta'), puerta);

    if (permiso) {
      this.permisosAccesoService.insertarPermisoAcceso({
        persona: persona,
        puerta: puerta,
        fechaInicio: new Date(),
        fechaFin: null
      }).subscribe(
        respuesta => {
          if (respuesta) {
            this.permisosAcceso[idPermisoAcceso].puertas[idPuerta].id = respuesta.id;
            this.permisosAcceso[idPermisoAcceso].puertas[idPuerta].permiso = true;
          }
        }
      );
    } else {
      this.permisosAccesoService.eliminarPermisoAccesoIndefinido(this.permisosAcceso[idPermisoAcceso].puertas[idPuerta].id).subscribe(
        respuesta => {
          if (respuesta) {
            this.permisosAcceso[idPermisoAcceso].puertas[idPuerta].id = null;
            this.permisosAcceso[idPermisoAcceso].puertas[idPuerta].permiso = false;
          }
        }
      );
    }
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
      }
    );

    this.permisosAccesoService.obtenerPermisosAccesoIndefinido().subscribe(
      permisosAcceso => {
        this.permisosAcceso = permisosAcceso;
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
            this.permisosAcceso.forEach((permiso) => {
              _.remove(this.personas, persona => persona.nombre === permiso.nombre);
            });
          }
        );
      }
    );
  }

}
