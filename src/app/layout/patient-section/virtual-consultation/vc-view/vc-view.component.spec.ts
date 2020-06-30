import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VcViewComponent } from './vc-view.component';

describe('VcViewComponent', () => {
  let component: VcViewComponent;
  let fixture: ComponentFixture<VcViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VcViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VcViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
