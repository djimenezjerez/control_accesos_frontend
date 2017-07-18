import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesMqttComponent } from './clientes-mqtt.component';

describe('ClientesMqttComponent', () => {
  let component: ClientesMqttComponent;
  let fixture: ComponentFixture<ClientesMqttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesMqttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesMqttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
