import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPasscodeComponent } from './form-passcode.component';

describe('FormPasscodeComponent', () => {
  let component: FormPasscodeComponent;
  let fixture: ComponentFixture<FormPasscodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPasscodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPasscodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
