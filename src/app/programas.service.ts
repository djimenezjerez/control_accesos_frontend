import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams, QueryEncoder } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import configuracion from './configuracion.json';

@Injectable()
export class ProgramasService {
  private api = `${(configuracion.sslApi) ? 'https' : 'http'}://${configuracion.servidorApi}:${configuracion.puertoApi}/v${configuracion.versionApi}/programas`;

  constructor(private http: Http, public authHttp: AuthHttp) { }

  obtenerProgramas(id: number): any {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    return this.authHttp.get(`${this.api}/${id}`, options)
    .map((res: Response) => res.text())
    .catch((error: any) => Observable.throw(error || 'Error en el servidor'));
  }
}
