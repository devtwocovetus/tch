import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignIntakeComponent } from './assign-intake.component';

describe('AssignIntakeComponent', () => {
  let component: AssignIntakeComponent;
  let fixture: ComponentFixture<AssignIntakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignIntakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignIntakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
