import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIntakeComponent } from './update-intake.component';

describe('UpdateIntakeComponent', () => {
  let component: UpdateIntakeComponent;
  let fixture: ComponentFixture<UpdateIntakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateIntakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateIntakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
