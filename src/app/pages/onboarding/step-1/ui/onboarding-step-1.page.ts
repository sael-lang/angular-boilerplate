import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding-step-1-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './onboarding-step-1.page.html',
  styleUrls: ['./onboarding-step-1.page.scss'],
})
export class OnboardingStep1Page {
  constructor(private readonly router: Router) {}

  skip(): void {
    this.router.navigate(['/dashboard']);
  }

  next(): void {
    this.router.navigate(['/onboarding/step-2']);
  }
}
