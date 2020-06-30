import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsIntakeComponent } from './actions-intake.component';

describe('ActionsIntakeComponent', () => {
  let component: ActionsIntakeComponent;
  let fixture: ComponentFixture<ActionsIntakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsIntakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsIntakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
