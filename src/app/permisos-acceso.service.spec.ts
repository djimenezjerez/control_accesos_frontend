import { TestBed, inject } from '@angular/core/testing';

import { PermisosAccesoService } from './permisos-acceso.service';

describe('PermisosAccesoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermisosAccesoService]
    });
  });

  it('should ...', inject([PermisosAccesoService], (service: PermisosAccesoService) => {
    expect(service).toBeTruthy();
  }));
});
