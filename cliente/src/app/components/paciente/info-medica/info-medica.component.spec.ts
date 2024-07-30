import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMedicaComponent } from './info-medica.component';

describe('InfoMedicaComponent', () => {
  let component: InfoMedicaComponent;
  let fixture: ComponentFixture<InfoMedicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoMedicaComponent]
    });
    fixture = TestBed.createComponent(InfoMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
