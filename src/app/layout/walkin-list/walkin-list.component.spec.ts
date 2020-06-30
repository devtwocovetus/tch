import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkinListComponent } from './walkin-list.component';

describe('WalkinListComponent', () => {
  let component: WalkinListComponent;
  let fixture: ComponentFixture<WalkinListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkinListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
