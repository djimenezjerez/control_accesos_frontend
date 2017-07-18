import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosAccesoIndefinidoComponent } from './permisos-acceso-indefinido.component';

describe('PermisosAccesoIndefinidoComponent', () => {
  let component: PermisosAccesoIndefinidoComponent;
  let fixture: ComponentFixture<PermisosAccesoIndefinidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermisosAccesoIndefinidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosAccesoIndefinidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
