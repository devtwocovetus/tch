import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditiorComponent } from './form-editior.component';

describe('FormEditiorComponent', () => {
  let component: FormEditiorComponent;
  let fixture: ComponentFixture<FormEditiorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEditiorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
