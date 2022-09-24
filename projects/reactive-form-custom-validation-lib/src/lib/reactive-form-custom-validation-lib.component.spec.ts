import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormCustomValidationErrorComponent } from './reactive-form-custom-validation-lib.component';

describe('ReactiveFormCustomValidationLibComponent', () => {
  let component: ReactiveFormCustomValidationErrorComponent;
  let fixture: ComponentFixture<ReactiveFormCustomValidationErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveFormCustomValidationErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveFormCustomValidationErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
