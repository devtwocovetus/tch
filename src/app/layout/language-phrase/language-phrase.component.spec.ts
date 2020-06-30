import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagePhraseComponent } from './language-phrase.component';

describe('LanguagePhraseComponent', () => {
  let component: LanguagePhraseComponent;
  let fixture: ComponentFixture<LanguagePhraseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguagePhraseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagePhraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
