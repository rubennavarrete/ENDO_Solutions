import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdontogramaComponent } from './odontograma.component';

describe('OdontogramaComponent', () => {
  let component: OdontogramaComponent;
  let fixture: ComponentFixture<OdontogramaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OdontogramaComponent]
    });
    fixture = TestBed.createComponent(OdontogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
