import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceMasterComponent } from './race-master.component';

describe('RaceMasterComponent', () => {
  let component: RaceMasterComponent;
  let fixture: ComponentFixture<RaceMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
