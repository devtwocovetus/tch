import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VcHistoryComponent } from './vc-history.component';

describe('VcHistoryComponent', () => {
  let component: VcHistoryComponent;
  let fixture: ComponentFixture<VcHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VcHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VcHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
