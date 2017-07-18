import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArduinosSensorComponent } from './arduinos-sensor.component';

describe('ArduinosSensorComponent', () => {
  let component: ArduinosSensorComponent;
  let fixture: ComponentFixture<ArduinosSensorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArduinosSensorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArduinosSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
