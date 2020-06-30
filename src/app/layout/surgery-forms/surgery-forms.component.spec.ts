import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeryFormsComponent } from './surgery-forms.component';

describe('SurgeryFormsComponent', () => {
  let component: SurgeryFormsComponent;
  let fixture: ComponentFixture<SurgeryFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgeryFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgeryFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
