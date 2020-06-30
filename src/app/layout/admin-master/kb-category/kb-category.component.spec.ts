import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbCategoryComponent } from './kb-category.component';

describe('KbCategoryComponent', () => {
  let component: KbCategoryComponent;
  let fixture: ComponentFixture<KbCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
