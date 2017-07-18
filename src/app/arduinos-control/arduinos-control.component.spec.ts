import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArduinosControlComponent } from './arduinos-control.component';

describe('ArduinosControlComponent', () => {
  let component: ArduinosControlComponent;
  let fixture: ComponentFixture<ArduinosControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArduinosControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArduinosControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
