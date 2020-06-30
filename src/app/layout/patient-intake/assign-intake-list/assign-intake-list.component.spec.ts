import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignIntakeListComponent } from './assign-intake-list.component';

describe('AssignIntakeListComponent', () => {
  let component: AssignIntakeListComponent;
  let fixture: ComponentFixture<AssignIntakeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignIntakeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignIntakeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
