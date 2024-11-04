import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEmpleadorComponent } from './editar-empleador.component';

describe('EditarEmpleadorComponent', () => {
  let component: EditarEmpleadorComponent;
  let fixture: ComponentFixture<EditarEmpleadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarEmpleadorComponent]
    });
    fixture = TestBed.createComponent(EditarEmpleadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
