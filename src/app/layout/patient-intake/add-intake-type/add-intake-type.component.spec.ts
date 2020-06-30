import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIntakeTypeComponent } from './add-intake-type.component';

describe('AddIntakeTypeComponent', () => {
  let component: AddIntakeTypeComponent;
  let fixture: ComponentFixture<AddIntakeTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIntakeTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIntakeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
