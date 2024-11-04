import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegimenLaboralComponent } from './regimen-laboral.component';

describe('RegimenLaboralComponent', () => {
  let component: RegimenLaboralComponent;
  let fixture: ComponentFixture<RegimenLaboralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegimenLaboralComponent]
    });
    fixture = TestBed.createComponent(RegimenLaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
