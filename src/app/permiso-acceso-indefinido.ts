export class PermisoAccesoIndefinido {
  persona: number;
  nombre: string;
  puertas: [
    {
      id: number,
      puerta: number,
      permiso: boolean
    }
  ];
}
