import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateWordComponent } from './generate-word.component';

describe('GenerateWordComponent', () => {
  let component: GenerateWordComponent;
  let fixture: ComponentFixture<GenerateWordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateWordComponent]
    });
    fixture = TestBed.createComponent(GenerateWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
