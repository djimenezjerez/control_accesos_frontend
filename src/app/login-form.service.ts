import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import configuracion from './configuracion.json';

@Injectable()
export class LoginFormService {
  private api = `${(configuracion.sslApi) ? 'https' : 'http'}://${configuracion.servidorApi}:${configuracion.puertoApi}/v${configuracion.versionApi}/autenticar`;

  constructor(private http: Http, public authHttp: AuthHttp) { }

  autenticar(body: Object) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });

    return this.http.post(`${this.api}`, body, options)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Error en el servidor'));
  }
}
