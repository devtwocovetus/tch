import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAnesthesiaComponent } from './master-anesthesia.component';

describe('MasterAnesthesiaComponent', () => {
  let component: MasterAnesthesiaComponent;
  let fixture: ComponentFixture<MasterAnesthesiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterAnesthesiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAnesthesiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
