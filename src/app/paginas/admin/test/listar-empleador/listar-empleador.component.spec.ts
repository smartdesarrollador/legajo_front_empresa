import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEmpleadorComponent } from './listar-empleador.component';

describe('ListarEmpleadorComponent', () => {
  let component: ListarEmpleadorComponent;
  let fixture: ComponentFixture<ListarEmpleadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarEmpleadorComponent]
    });
    fixture = TestBed.createComponent(ListarEmpleadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
