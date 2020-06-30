import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EthinicityMasterComponent } from './ethinicity-master.component';

describe('EthinicityMasterComponent', () => {
  let component: EthinicityMasterComponent;
  let fixture: ComponentFixture<EthinicityMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EthinicityMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EthinicityMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
