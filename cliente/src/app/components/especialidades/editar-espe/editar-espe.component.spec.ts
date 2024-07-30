import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEspeComponent } from './editar-espe.component';

describe('EditarEspeComponent', () => {
  let component: EditarEspeComponent;
  let fixture: ComponentFixture<EditarEspeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarEspeComponent]
    });
    fixture = TestBed.createComponent(EditarEspeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
