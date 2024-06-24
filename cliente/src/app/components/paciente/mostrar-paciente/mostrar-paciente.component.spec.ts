import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarPacienteComponent } from './mostrar-paciente.component';

describe('MostrarPacienteComponent', () => {
  let component: MostrarPacienteComponent;
  let fixture: ComponentFixture<MostrarPacienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarPacienteComponent]
    });
    fixture = TestBed.createComponent(MostrarPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
