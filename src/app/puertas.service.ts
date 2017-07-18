import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams, QueryEncoder } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Puerta } from './puerta';
import { ParametroGet } from './parametro-get';
import configuracion from './configuracion.json';

@Injectable()
export class PuertasService {
  private api = `${(configuracion.sslApi) ? 'https' : 'http'}://${configuracion.servidorApi}:${configuracion.puertoApi}/v${configuracion.versionApi}`;

  constructor(private http: Http, public authHttp: AuthHttp) { }

  obtenerPuertas(parametros: ParametroGet[] = []): Observable<Puerta[]> {
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
    return this.authHttp.get(`${this.api}/puertas`, options)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Error en el servidor'));
  }

  abrirPuerta(body: Object): any {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });

    return this.authHttp.post(`${this.api}/puerta/abrirPuerta`, body, options)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Error en el servidor'));
  }

  eliminarPuerta(id: number) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    return this.authHttp.delete(`${this.api}/puertas/${id}`, options)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Error en el servidor'));
  }

  actualizarPuerta(id: number, body: object) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    return this.authHttp.put(`${this.api}/puertas/${id}`, body, options)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Error en el servidor'));
  }

  insertarPuerta(body: Object) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    return this.authHttp.post(`${this.api}/puertas`, body, options)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Error en el servidor'));
  }
}
