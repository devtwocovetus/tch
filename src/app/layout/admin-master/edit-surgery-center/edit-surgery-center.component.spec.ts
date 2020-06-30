import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSurgeryCenterComponent } from './edit-surgery-center.component';

describe('EditSurgeryCenterComponent', () => {
  let component: EditSurgeryCenterComponent;
  let fixture: ComponentFixture<EditSurgeryCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSurgeryCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSurgeryCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
