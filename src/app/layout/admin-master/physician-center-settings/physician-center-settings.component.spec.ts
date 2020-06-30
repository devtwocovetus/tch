import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicianCenterSettingsComponent } from './physician-center-settings.component';

describe('PhysicianCenterSettingsComponent', () => {
  let component: PhysicianCenterSettingsComponent;
  let fixture: ComponentFixture<PhysicianCenterSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicianCenterSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicianCenterSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
