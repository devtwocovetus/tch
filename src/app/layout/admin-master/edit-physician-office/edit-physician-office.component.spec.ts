import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhysicianOfficeComponent } from './edit-physician-office.component';

describe('EditPhysicianOfficeComponent', () => {
  let component: EditPhysicianOfficeComponent;
  let fixture: ComponentFixture<EditPhysicianOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPhysicianOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhysicianOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
