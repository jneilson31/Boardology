import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeIntroContentComponent } from './home-intro-content.component';

describe('HomeIntroContentComponent', () => {
  let component: HomeIntroContentComponent;
  let fixture: ComponentFixture<HomeIntroContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeIntroContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeIntroContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
