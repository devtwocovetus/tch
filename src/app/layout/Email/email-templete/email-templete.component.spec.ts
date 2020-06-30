import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTempleteComponent } from './email-templete.component';

describe('EmailTempleteComponent', () => {
  let component: EmailTempleteComponent;
  let fixture: ComponentFixture<EmailTempleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailTempleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailTempleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
