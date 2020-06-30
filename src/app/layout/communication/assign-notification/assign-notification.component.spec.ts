import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignNotificationComponent } from './assign-notification.component';

describe('AssignNotificationComponent', () => {
  let component: AssignNotificationComponent;
  let fixture: ComponentFixture<AssignNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
