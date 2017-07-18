export class Sensor {
  id: Number;
  mac: String;
  ip: String;
  control: Boolean;
  detalle: String;
  pinesSalida: Number[];
  createdAt: Date;
  updatedAt: Date;
  clienteMqtt: Number;
  puerta: Number;
  ClienteMqtt: Object;
  PuertaSensor: Object;
  PuertaControl: Object[];
}
