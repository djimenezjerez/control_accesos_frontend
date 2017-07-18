import { TestBed, inject } from '@angular/core/testing';

import { SensoresService } from './sensores.service';

describe('SensoresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SensoresService]
    });
  });

  it('should ...', inject([SensoresService], (service: SensoresService) => {
    expect(service).toBeTruthy();
  }));
});
