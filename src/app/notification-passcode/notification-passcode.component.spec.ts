import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPasscodeComponent } from './notification-passcode.component';

describe('NotificationPasscodeComponent', () => {
  let component: NotificationPasscodeComponent;
  let fixture: ComponentFixture<NotificationPasscodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationPasscodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationPasscodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
