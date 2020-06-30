import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentationMasterComponent } from './instrumentation-master.component';

describe('InstrumentationMasterComponent', () => {
  let component: InstrumentationMasterComponent;
  let fixture: ComponentFixture<InstrumentationMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentationMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
