import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeryMasterComponent } from './surgery-master.component';

describe('SurgeryMasterComponent', () => {
  let component: SurgeryMasterComponent;
  let fixture: ComponentFixture<SurgeryMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgeryMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgeryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
