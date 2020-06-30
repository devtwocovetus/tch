import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickBookingListComponent } from './quick-booking-list.component';

describe('QuickBookingListComponent', () => {
  let component: QuickBookingListComponent;
  let fixture: ComponentFixture<QuickBookingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickBookingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
