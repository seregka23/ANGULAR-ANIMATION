import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapAnimationComponent } from './swap-animation.component';

describe('SwapAnimationComponent', () => {
  let component: SwapAnimationComponent;
  let fixture: ComponentFixture<SwapAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwapAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwapAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
