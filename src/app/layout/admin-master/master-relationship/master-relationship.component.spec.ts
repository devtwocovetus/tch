import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRelationshipComponent } from './master-relationship.component';

describe('MasterRelationshipComponent', () => {
  let component: MasterRelationshipComponent;
  let fixture: ComponentFixture<MasterRelationshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterRelationshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
