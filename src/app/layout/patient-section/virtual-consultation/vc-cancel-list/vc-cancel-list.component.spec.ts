import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VcCancelListComponent } from './vc-cancel-list.component';

describe('VcCancelListComponent', () => {
  let component: VcCancelListComponent;
  let fixture: ComponentFixture<VcCancelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VcCancelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VcCancelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
