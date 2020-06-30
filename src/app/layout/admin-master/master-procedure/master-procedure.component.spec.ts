import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterProcedureComponent } from './master-procedure.component';

describe('MasterProcedureComponent', () => {
  let component: MasterProcedureComponent;
  let fixture: ComponentFixture<MasterProcedureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterProcedureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
