import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AuthGuard } from './auth.guard';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginFormService } from './login-form.service';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';
import { Usuario } from './usuario';
import { Error } from './error';
import { Puerta } from './puerta';
import { TokenService } from './token.service';
import { PuertasService } from './puertas.service';
import { AccesosService } from './accesos.service';
import { SocketService } from './socket.service';
import { PermisosAccesoService } from './permisos-acceso.service';
import { PersonasService } from './personas.service';
import { HuellasService } from './huellas.service';
import { RespuestasService } from './respuestas.service';
import { SensoresService } from './sensores.service';
import { ClientesMqttService } from './clientes-mqtt.service';
import { MicroservicioPersonasService } from './microservicio-personas.service';
import { ProgramasService } from './programas.service';
import { NavegacionLateralComponent } from './navegacion-lateral/navegacion-lateral.component';
import { MonitorComponent } from './monitor/monitor.component';
import { PermisosAccesoTemporalComponent } from './permisos-acceso-temporal/permisos-acceso-temporal.component';
import { PermisosComponent } from './permisos/permisos.component';
import { PermisosAccesoIndefinidoComponent } from './permisos-acceso-indefinido/permisos-acceso-indefinido.component';
import { PersonasComponent } from './personas/personas.component';
import { AccesosComponent } from './accesos/accesos.component';
import { RespuestasComponent } from './respuestas/respuestas.component';
import { HistorialComponent } from './historial/historial.component';
import { SensoresComponent } from './sensores/sensores.component';
import { PuertasComponent } from './puertas/puertas.component';
import { ArduinosControlComponent } from './arduinos-control/arduinos-control.component';
import { ArduinosSensorComponent } from './arduinos-sensor/arduinos-sensor.component';
import { ClientesMqttComponent } from './clientes-mqtt/clientes-mqtt.component';

import { MaterializeModule } from 'angular2-materialize';
import { ClipboardModule } from 'ngx-clipboard';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomeComponent,
    NavegacionLateralComponent,
    MonitorComponent,
    PermisosAccesoTemporalComponent,
    PermisosComponent,
    PermisosAccesoIndefinidoComponent,
    PersonasComponent,
    AccesosComponent,
    RespuestasComponent,
    HistorialComponent,
    SensoresComponent,
    PuertasComponent,
    ArduinosControlComponent,
    ArduinosSensorComponent,
    ClientesMqttComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    JsonpModule,
    AuthModule,
    ClipboardModule,
    MaterializeModule,
    MomentModule
  ],
  providers: [
    Usuario,
    Error,
    Puerta,
    AuthGuard,
    LoginFormService,
    TokenService,
    PuertasService,
    AccesosService,
    SocketService,
    PermisosAccesoService,
    PersonasService,
    MicroservicioPersonasService,
    HuellasService,
    RespuestasService,
    SensoresService,
    ClientesMqttService,
    ProgramasService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
