import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureCarouselComponent } from './picture-carousel.component';

describe('PictureCarouselComponent', () => {
  let component: PictureCarouselComponent;
  let fixture: ComponentFixture<PictureCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
