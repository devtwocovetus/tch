import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIntakeComponent } from './edit-intake.component';

describe('EditIntakeComponent', () => {
  let component: EditIntakeComponent;
  let fixture: ComponentFixture<EditIntakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIntakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIntakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
