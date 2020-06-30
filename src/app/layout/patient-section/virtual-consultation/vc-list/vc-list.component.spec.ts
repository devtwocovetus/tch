import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VcListComponent } from './vc-list.component';

describe('VcListComponent', () => {
  let component: VcListComponent;
  let fixture: ComponentFixture<VcListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VcListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
