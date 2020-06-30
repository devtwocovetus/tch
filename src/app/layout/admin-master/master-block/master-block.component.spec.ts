import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterBlockComponent } from './master-block.component';

describe('MasterBlockComponent', () => {
  let component: MasterBlockComponent;
  let fixture: ComponentFixture<MasterBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
