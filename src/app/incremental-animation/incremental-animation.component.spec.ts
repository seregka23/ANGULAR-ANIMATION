import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrementalAnimationComponent } from './incremental-animation.component';

describe('IncrementalAnimationComponent', () => {
  let component: IncrementalAnimationComponent;
  let fixture: ComponentFixture<IncrementalAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncrementalAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncrementalAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
