import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCitaComponent } from './agregar-cita.component';

describe('AgregarCitaComponent', () => {
  let component: AgregarCitaComponent;
  let fixture: ComponentFixture<AgregarCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarCitaComponent]
    });
    fixture = TestBed.createComponent(AgregarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
