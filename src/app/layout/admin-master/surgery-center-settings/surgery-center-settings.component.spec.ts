import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeryCenterSettingsComponent } from './surgery-center-settings.component';

describe('SurgeryCenterSettingsComponent', () => {
  let component: SurgeryCenterSettingsComponent;
  let fixture: ComponentFixture<SurgeryCenterSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgeryCenterSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgeryCenterSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
