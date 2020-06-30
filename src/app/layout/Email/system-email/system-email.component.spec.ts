import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemEmailComponent } from './system-email.component';

describe('SystemEmailComponent', () => {
  let component: SystemEmailComponent;
  let fixture: ComponentFixture<SystemEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
