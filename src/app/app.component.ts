import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SortAnimationComponent } from './sort-animation/sort-animation.component';
import { OpenCloseComponent } from './open-close/open-close.component';
import { SwapAnimationComponent } from './swap-animation/swap-animation.component';
import { IncrementalAnimationComponent } from './incremental-animation/incremental-animation.component';
import { AnimationBuilderComponent } from './animation-builder/animation-builder.component';
import { LoadAnimationComponent } from './load-animation/load-animation.component';
import { MonteCarloComponent } from './monte-carlo/monte-carlo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SortAnimationComponent, OpenCloseComponent, SwapAnimationComponent, IncrementalAnimationComponent, AnimationBuilderComponent,LoadAnimationComponent, MonteCarloComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'angular-animation';
}
