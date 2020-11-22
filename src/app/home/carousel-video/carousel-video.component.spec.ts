import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselVideoComponent } from './carousel-video.component';

describe('CarouselVideoComponent', () => {
  let component: CarouselVideoComponent;
  let fixture: ComponentFixture<CarouselVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
