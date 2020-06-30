import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterIcd10Component } from './master-icd10.component';

describe('MasterIcd10Component', () => {
  let component: MasterIcd10Component;
  let fixture: ComponentFixture<MasterIcd10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterIcd10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterIcd10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
