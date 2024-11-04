import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadorDosComponent } from './empleador-dos.component';

describe('EmpleadorDosComponent', () => {
  let component: EmpleadorDosComponent;
  let fixture: ComponentFixture<EmpleadorDosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpleadorDosComponent]
    });
    fixture = TestBed.createComponent(EmpleadorDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
