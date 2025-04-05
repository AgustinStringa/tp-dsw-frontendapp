import { AfterViewInit, Component, Input } from '@angular/core';
import {
  NgxAnimatedCounterModule,
  NgxAnimatedCounterParams,
} from '@bugsplat/ngx-animated-counter';

@Component({
  selector: 'app-goals-summary',
  standalone: true,
  imports: [NgxAnimatedCounterModule],
  templateUrl: './goals-summary.component.html',
  styleUrl: './goals-summary.component.css',
})
export class GoalsSummaryComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.achievedGoalsParams = {
      start: 0,
      end: this.achievedGoals,
      interval: 1200,
      increment: 1,
    };
    this.goalsParams = {
      start: 0,
      end: this.proposedGoals,
      interval: 1200,
      increment: 1,
    };
  }
  @Input() proposedGoals = 0;
  @Input() achievedGoals = 0;

  public achievedGoalsParams: NgxAnimatedCounterParams | null = null;
  public goalsParams: NgxAnimatedCounterParams | null = null;
}
