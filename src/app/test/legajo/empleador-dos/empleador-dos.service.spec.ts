import { TestBed } from '@angular/core/testing';

import { EmpleadorDosService } from './empleador-dos.service';

describe('EmpleadorDosService', () => {
  let service: EmpleadorDosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadorDosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
