import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicianMasterComponent } from './physician-master.component';

describe('PhysicianMasterComponent', () => {
  let component: PhysicianMasterComponent;
  let fixture: ComponentFixture<PhysicianMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicianMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicianMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
