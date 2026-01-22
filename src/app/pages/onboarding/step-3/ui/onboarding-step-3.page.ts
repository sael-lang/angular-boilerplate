import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { OnboardingStateService, RiskTemplate } from '../../data-access/onboarding-state.service';

@Component({
  selector: 'app-onboarding-step-3-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './onboarding-step-3.page.html',
  styleUrls: ['./onboarding-step-3.page.scss'],
})
export class OnboardingStep3Page {
  constructor(
    private readonly router: Router,
    private readonly state: OnboardingStateService,
  ) {}

  selectedTemplate?: RiskTemplate;

  back(): void {
    this.router.navigate(['/onboarding/step-2']);
  }

  skipForNow(): void {
    this.router.navigate(['/dashboard']);
  }

  selectTemplate(template: RiskTemplate): void {
    this.selectedTemplate = template;
    this.state.setRiskTemplate(template);
  }

  buildCustom(): void {
    this.selectedTemplate = undefined;
    this.router.navigate(['/onboarding/step-4']);
  }

  continue(): void {
    if (!this.selectedTemplate) {
      return;
    }

    this.router.navigate(['/onboarding/step-4']);
  }
}
