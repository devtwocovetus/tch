import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuikBookComponent } from './quik-book.component';

describe('QuikBookComponent', () => {
  let component: QuikBookComponent;
  let fixture: ComponentFixture<QuikBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuikBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuikBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
