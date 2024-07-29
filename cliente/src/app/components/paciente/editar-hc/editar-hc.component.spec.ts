import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarHCComponent } from './editar-hc.component';

describe('EditarHCComponent', () => {
  let component: EditarHCComponent;
  let fixture: ComponentFixture<EditarHCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarHCComponent]
    });
    fixture = TestBed.createComponent(EditarHCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
