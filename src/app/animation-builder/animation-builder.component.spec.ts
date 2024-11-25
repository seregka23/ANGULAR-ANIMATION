import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationBuilderComponent } from './animation-builder.component';

describe('AnimationBuilderComponent', () => {
  let component: AnimationBuilderComponent;
  let fixture: ComponentFixture<AnimationBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimationBuilderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimationBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
