import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams, QueryEncoder } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { ParametroGet } from './parametro-get';
import configuracion from './configuracion.json';

@Injectable()
export class HuellasService {
  private api = `${(configuracion.sslApi) ? 'https' : 'http'}://${configuracion.servidorApi}:${configuracion.puertoApi}/v${configuracion.versionApi}/huellas`;

  constructor(private http: Http, public authHttp: AuthHttp) { }

  verificarImagen(id: number): any {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    return this.authHttp.head(`${this.api}/${id}`, options)
    .map((res: Response) => this.api)
    .catch((error: any) => Observable.throw(error || 'Error en el servidor'));
  }

  grabar(body: Object) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    return this.authHttp.post(`${this.api}/grabar`, body, options)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Error en el servidor'));
  }

  enviar(body: Object): Observable<{
    mensaje: string;
  }> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });

    return this.authHttp.put(`${this.api}/enviar`, body, options)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Error en el servidor'));
  }

  borrar(body: Object): Observable<{
    mensaje: string;
  }> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });

    return this.authHttp.put(`${this.api}/borrar`, body, options)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Error en el servidor'));
  }
}
