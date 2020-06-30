import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbArticleFeedbackComponent } from './kb-article-feedback.component';

describe('KbArticleFeedbackComponent', () => {
  let component: KbArticleFeedbackComponent;
  let fixture: ComponentFixture<KbArticleFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbArticleFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbArticleFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
