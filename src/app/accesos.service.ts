import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams, QueryEncoder } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Acceso } from './acceso';
import { ParametroGet } from './parametro-get';
import configuracion from './configuracion.json';

@Injectable()
export class AccesosService {
  private api = `${(configuracion.sslApi) ? 'https' : 'http'}://${configuracion.servidorApi}:${configuracion.puertoApi}/v${configuracion.versionApi}/accesos`;

  constructor(private http: Http, public authHttp: AuthHttp) { }

  obtenerAccesos(parametros: ParametroGet[] = []): Observable<Acceso[]> {
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
}
