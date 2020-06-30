import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VcNotificationComponent } from './vc-notification.component';

describe('VcNotificationComponent', () => {
  let component: VcNotificationComponent;
  let fixture: ComponentFixture<VcNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VcNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VcNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
