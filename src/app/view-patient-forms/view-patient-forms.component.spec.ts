import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPatientFormsComponent } from './view-patient-forms.component';

describe('ViewPatientFormsComponent', () => {
  let component: ViewPatientFormsComponent;
  let fixture: ComponentFixture<ViewPatientFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPatientFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPatientFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
