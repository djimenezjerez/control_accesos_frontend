import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams, QueryEncoder } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Puerta } from './puerta';
import { PermisoAccesoIndefinido } from './permiso-acceso-indefinido';
import { PermisoAccesoTemporal } from './permiso-acceso-temporal';
import { ParametroGet } from './parametro-get';
import configuracion from './configuracion.json';

@Injectable()
export class PermisosAccesoService {
  private api = `${(configuracion.sslApi) ? 'https' : 'http'}://${configuracion.servidorApi}:${configuracion.puertoApi}/v${configuracion.versionApi}`;

  constructor(private http: Http, public authHttp: AuthHttp) { }

  obtenerPermisosAccesoIndefinido(parametros: ParametroGet[] = []): Observable<PermisoAccesoIndefinido[]> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    if (parametros.length > 0) {
      const params = new URLSearchParams();
      parametros.forEach((p) => {
        params.set(p.parametro, p.valor);
      });
      options.search = params;
    }
    return this.authHttp.get(`${this.api}/permisosAccesoIndefinido`, options)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Error en el servidor'));
  }

  insertarPermisoAcceso(body: Object) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    return this.authHttp.post(`${this.api}/permisosAcceso`, body, options)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Error en el servidor'));
  }

  eliminarPermisoAccesoIndefinido(id: number) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    return this.authHttp.delete(`${this.api}/permisosAcceso/${id}`, options)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Error en el servidor'));
  }

  obtenerPermisosAccesoTemporal(parametros: ParametroGet[] = []): Observable<PermisoAccesoTemporal[]> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    if (parametros.length > 0) {
      const params = new URLSearchParams();
      parametros.forEach((p) => {
        params.set(p.parametro, p.valor);
      });
      options.search = params;
    }
    return this.authHttp.get(`${this.api}/permisosAcceso`, options)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Error en el servidor'));
  }

  eliminarPermisoAccesoTemporal(id: number) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    return this.authHttp.delete(`${this.api}/permisosAcceso/${id}`, options)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Error en el servidor'));
  }

  actualizarFechaPermisoTemporal(id: number, body: {
    fechaInicio: Date,
    fechaFin: Date
  }) {
    if (body.fechaInicio <= body.fechaFin) {
      const headers = new Headers({
        'Content-Type': 'application/json'
      });
      const options = new RequestOptions({
        headers: headers
      });
      return this.authHttp.put(`${this.api}/permisosAcceso/${id}`, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Error en el servidor'));
    } else {
      return Observable.throw(false);
    }
  }
}
