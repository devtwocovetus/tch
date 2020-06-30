import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReligionMasterComponent } from './religion-master.component';

describe('ReligionMasterComponent', () => {
  let component: ReligionMasterComponent;
  let fixture: ComponentFixture<ReligionMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReligionMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReligionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
