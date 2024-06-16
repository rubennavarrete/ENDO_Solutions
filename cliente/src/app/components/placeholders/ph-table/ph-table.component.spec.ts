import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhTableComponent } from './ph-table.component';

describe('PhTableComponent', () => {
  let component: PhTableComponent;
  let fixture: ComponentFixture<PhTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhTableComponent]
    });
    fixture = TestBed.createComponent(PhTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
