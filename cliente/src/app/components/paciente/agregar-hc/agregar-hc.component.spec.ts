import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarHCComponent } from './agregar-hc.component';

describe('AgregarHCComponent', () => {
  let component: AgregarHCComponent;
  let fixture: ComponentFixture<AgregarHCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarHCComponent]
    });
    fixture = TestBed.createComponent(AgregarHCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
