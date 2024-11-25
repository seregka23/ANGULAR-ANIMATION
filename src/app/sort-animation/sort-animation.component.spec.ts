import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortAnimationComponent } from './sort-animation.component';

describe('SortAnimationComponent', () => {
  let component: SortAnimationComponent;
  let fixture: ComponentFixture<SortAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
