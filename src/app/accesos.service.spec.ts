import { TestBed, inject } from '@angular/core/testing';

import { AccesosService } from './accesos.service';

describe('AccesosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccesosService]
    });
  });

  it('should ...', inject([AccesosService], (service: AccesosService) => {
    expect(service).toBeTruthy();
  }));
});
