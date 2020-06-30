import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAlertsComponent } from './master-alerts.component';

describe('MasterAlertsComponent', () => {
  let component: MasterAlertsComponent;
  let fixture: ComponentFixture<MasterAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterAlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
