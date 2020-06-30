import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VcBookComponent } from './vc-book.component';

describe('VcBookComponent', () => {
  let component: VcBookComponent;
  let fixture: ComponentFixture<VcBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VcBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VcBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
