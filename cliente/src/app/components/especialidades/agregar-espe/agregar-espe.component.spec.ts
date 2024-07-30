import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEspeComponent } from './agregar-espe.component';

describe('AgregarEspeComponent', () => {
  let component: AgregarEspeComponent;
  let fixture: ComponentFixture<AgregarEspeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarEspeComponent]
    });
    fixture = TestBed.createComponent(AgregarEspeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
