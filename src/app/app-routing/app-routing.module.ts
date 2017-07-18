import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from '../login-form/login-form.component';
import { HomeComponent } from '../home/home.component';
import { PermisosComponent } from '../permisos/permisos.component';
import { PersonasComponent } from '../personas/personas.component';
import { SensoresComponent } from '../sensores/sensores.component';
import { PuertasComponent } from '../puertas/puertas.component';
import { HistorialComponent } from '../historial/historial.component';
import { ClientesMqttComponent } from '../clientes-mqtt/clientes-mqtt.component';
import { AppComponent } from '../app.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: 'personas',
    component: PersonasComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'permisos',
    component: PermisosComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'sensores',
    component: SensoresComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'clientesMqtt',
    component: ClientesMqttComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'puertas',
    component: PuertasComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'historial',
    component: HistorialComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'login',
    component: LoginFormComponent
  }, {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
