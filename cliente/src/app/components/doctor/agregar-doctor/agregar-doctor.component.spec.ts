import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDoctorComponent } from './agregar-doctor.component';

describe('AgregarDoctorComponent', () => {
  let component: AgregarDoctorComponent;
  let fixture: ComponentFixture<AgregarDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarDoctorComponent]
    });
    fixture = TestBed.createComponent(AgregarDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
