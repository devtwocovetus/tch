import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSpecilityComponent } from './master-specility.component';

describe('MasterSpecilityComponent', () => {
  let component: MasterSpecilityComponent;
  let fixture: ComponentFixture<MasterSpecilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSpecilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSpecilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
