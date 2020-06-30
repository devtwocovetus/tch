import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCptComponent } from './master-cpt.component';

describe('MasterCptComponent', () => {
  let component: MasterCptComponent;
  let fixture: ComponentFixture<MasterCptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
