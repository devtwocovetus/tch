import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicianContactSettingsComponent } from './physician-contact-settings.component';

describe('PhysicianContactSettingsComponent', () => {
  let component: PhysicianContactSettingsComponent;
  let fixture: ComponentFixture<PhysicianContactSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicianContactSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicianContactSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
