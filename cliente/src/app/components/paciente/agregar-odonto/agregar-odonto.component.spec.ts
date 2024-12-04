import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarOdontoComponent } from './agregar-odonto.component';

describe('AgregarOdontoComponent', () => {
  let component: AgregarOdontoComponent;
  let fixture: ComponentFixture<AgregarOdontoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarOdontoComponent]
    });
    fixture = TestBed.createComponent(AgregarOdontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
