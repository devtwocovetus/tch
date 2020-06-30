import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeryContactSettingsComponent } from './surgery-contact-settings.component';

describe('SurgeryContactSettingsComponent', () => {
  let component: SurgeryContactSettingsComponent;
  let fixture: ComponentFixture<SurgeryContactSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgeryContactSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgeryContactSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
