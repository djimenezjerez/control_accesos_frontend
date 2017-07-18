import { TestBed, inject } from '@angular/core/testing';

import { HuellasService } from './huellas.service';

describe('HuellasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HuellasService]
    });
  });

  it('should ...', inject([HuellasService], (service: HuellasService) => {
    expect(service).toBeTruthy();
  }));
});
