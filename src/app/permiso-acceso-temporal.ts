export class PermisoAccesoTemporal {
  id: number;
  fechaInicio: Date;
  fechaFin: Date;
  Puerta: {
    id: number,
    nombre: string,
    pin: number,
    estadoInicial: boolean,
    estadoActual: boolean,
    detalle: string,
    arduinoControl: number
  };
  Persona: {
    id: number,
    nombre: string,
    grabado: boolean
  };
}
