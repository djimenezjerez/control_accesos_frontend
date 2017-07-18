import { TestBed, inject } from '@angular/core/testing';

import { PuertasService } from './puertas.service';

describe('PuertasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PuertasService]
    });
  });

  it('should ...', inject([PuertasService], (service: PuertasService) => {
    expect(service).toBeTruthy();
  }));
});
