import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams, QueryEncoder } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Sensor } from './sensor';
import { ParametroGet } from './parametro-get';
import configuracion from './configuracion.json';

@Injectable()
export class SensoresService {
  private api = `${(configuracion.sslApi) ? 'https' : 'http'}://${configuracion.servidorApi}:${configuracion.puertoApi}/v${configuracion.versionApi}/arduinos`;

  constructor(private http: Http, public authHttp: AuthHttp) { }

  obtenerArduinos(parametros: ParametroGet[] = []): Observable<Sensor[]> {
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
    return this.authHttp.get(`${this.api}`, options)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Error en el servidor'));
  }

  eliminarArduino(id: number) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    return this.authHttp.delete(`${this.api}/${id}`, options)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Error en el servidor'));
  }

  actualizarArduino(id: number, body: object) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    return this.authHttp.put(`${this.api}/${id}`, body, options)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Error en el servidor'));
  }

  insertarArduino(body: Object) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    return this.authHttp.post(`${this.api}`, body, options)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Error en el servidor'));
  }
}
