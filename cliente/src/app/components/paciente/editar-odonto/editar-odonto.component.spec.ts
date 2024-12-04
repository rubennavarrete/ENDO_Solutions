import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarOdontoComponent } from './editar-odonto.component';

describe('EditarOdontoComponent', () => {
  let component: EditarOdontoComponent;
  let fixture: ComponentFixture<EditarOdontoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarOdontoComponent]
    });
    fixture = TestBed.createComponent(EditarOdontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
