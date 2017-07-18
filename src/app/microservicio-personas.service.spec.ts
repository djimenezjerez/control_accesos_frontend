import { TestBed, inject } from '@angular/core/testing';

import { MicroservicioPersonasService } from './microservicio-personas.service';

describe('MicroservicioPersonasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MicroservicioPersonasService]
    });
  });

  it('should ...', inject([MicroservicioPersonasService], (service: MicroservicioPersonasService) => {
    expect(service).toBeTruthy();
  }));
});
