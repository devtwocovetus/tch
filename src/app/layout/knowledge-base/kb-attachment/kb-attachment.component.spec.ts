import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbAttachmentComponent } from './kb-attachment.component';

describe('KbAttachmentComponent', () => {
  let component: KbAttachmentComponent;
  let fixture: ComponentFixture<KbAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
