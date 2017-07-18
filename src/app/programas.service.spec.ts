import { TestBed, inject } from '@angular/core/testing';

import { ProgramasService } from './programas.service';

describe('ProgramasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgramasService]
    });
  });

  it('should ...', inject([ProgramasService], (service: ProgramasService) => {
    expect(service).toBeTruthy();
  }));
});
