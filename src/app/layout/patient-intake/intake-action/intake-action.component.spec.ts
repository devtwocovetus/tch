import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeActionComponent } from './intake-action.component';

describe('IntakeActionComponent', () => {
  let component: IntakeActionComponent;
  let fixture: ComponentFixture<IntakeActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntakeActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakeActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
