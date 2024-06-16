import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhBaseComponent } from './ph-base.component';

describe('PhBaseComponent', () => {
  let component: PhBaseComponent;
  let fixture: ComponentFixture<PhBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhBaseComponent]
    });
    fixture = TestBed.createComponent(PhBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
