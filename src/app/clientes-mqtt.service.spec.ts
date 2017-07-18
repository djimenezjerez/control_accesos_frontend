import { TestBed, inject } from '@angular/core/testing';

import { ClientesMqttService } from './clientes-mqtt.service';

describe('ClientesMqttService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientesMqttService]
    });
  });

  it('should ...', inject([ClientesMqttService], (service: ClientesMqttService) => {
    expect(service).toBeTruthy();
  }));
});
