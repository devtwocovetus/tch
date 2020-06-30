import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbReferenceComponent } from './kb-reference.component';

describe('KbReferenceComponent', () => {
  let component: KbReferenceComponent;
  let fixture: ComponentFixture<KbReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
