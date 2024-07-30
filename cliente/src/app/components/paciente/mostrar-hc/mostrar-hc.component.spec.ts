import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarHCComponent } from './mostrar-hc.component';

describe('MostrarHCComponent', () => {
  let component: MostrarHCComponent;
  let fixture: ComponentFixture<MostrarHCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarHCComponent]
    });
    fixture = TestBed.createComponent(MostrarHCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
