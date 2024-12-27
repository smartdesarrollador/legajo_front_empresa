import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateWordFormatosComponent } from './generate-word-formatos.component';

describe('GenerateWordFormatosComponent', () => {
  let component: GenerateWordFormatosComponent;
  let fixture: ComponentFixture<GenerateWordFormatosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateWordFormatosComponent]
    });
    fixture = TestBed.createComponent(GenerateWordFormatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
