import { TestBed } from '@angular/core/testing';

import { RegistroEmpleadorService } from './registro-empleador.service';

describe('RegistroEmpleadorService', () => {
  let service: RegistroEmpleadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroEmpleadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
