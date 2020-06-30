import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesMasterComponent } from './supplies-master.component';

describe('SuppliesMasterComponent', () => {
  let component: SuppliesMasterComponent;
  let fixture: ComponentFixture<SuppliesMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliesMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliesMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
