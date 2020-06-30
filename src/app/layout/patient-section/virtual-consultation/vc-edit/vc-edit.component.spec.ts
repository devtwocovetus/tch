import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VcEditComponent } from './vc-edit.component';

describe('VcEditComponent', () => {
  let component: VcEditComponent;
  let fixture: ComponentFixture<VcEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VcEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VcEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
