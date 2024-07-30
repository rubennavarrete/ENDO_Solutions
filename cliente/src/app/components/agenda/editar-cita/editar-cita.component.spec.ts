import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCitaComponent } from './editar-cita.component';

describe('EditarCitaComponent', () => {
  let component: EditarCitaComponent;
  let fixture: ComponentFixture<EditarCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarCitaComponent]
    });
    fixture = TestBed.createComponent(EditarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
