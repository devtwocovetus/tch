import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignNotificationListComponent } from './assign-notification-list.component';

describe('AssignNotificationListComponent', () => {
  let component: AssignNotificationListComponent;
  let fixture: ComponentFixture<AssignNotificationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignNotificationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignNotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
