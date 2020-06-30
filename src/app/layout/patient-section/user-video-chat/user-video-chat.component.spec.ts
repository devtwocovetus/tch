import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVideoChatComponent } from './user-video-chat.component';

describe('UserVideoChatComponent', () => {
  let component: UserVideoChatComponent;
  let fixture: ComponentFixture<UserVideoChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVideoChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVideoChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
