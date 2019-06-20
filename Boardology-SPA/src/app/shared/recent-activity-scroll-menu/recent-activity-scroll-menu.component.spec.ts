import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentActivityScrollMenuComponent } from './recent-activity-scroll-menu.component';

describe('RecentActivityScrollMenuComponent', () => {
  let component: RecentActivityScrollMenuComponent;
  let fixture: ComponentFixture<RecentActivityScrollMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentActivityScrollMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentActivityScrollMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
