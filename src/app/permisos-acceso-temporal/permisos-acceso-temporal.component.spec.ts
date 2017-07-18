import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosAccesoTemporalComponent } from './permisos-acceso-temporal.component';

describe('PermisosAccesoTemporalComponent', () => {
  let component: PermisosAccesoTemporalComponent;
  let fixture: ComponentFixture<PermisosAccesoTemporalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermisosAccesoTemporalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosAccesoTemporalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
