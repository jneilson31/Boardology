import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSecondaryComponent } from './header-secondary.component';

describe('HeaderSecondaryComponent', () => {
  let component: HeaderSecondaryComponent;
  let fixture: ComponentFixture<HeaderSecondaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderSecondaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
