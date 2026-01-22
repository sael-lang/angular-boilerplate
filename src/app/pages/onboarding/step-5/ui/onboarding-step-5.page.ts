import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OnboardingStateService } from '../../data-access/onboarding-state.service';

@Component({
  selector: 'app-onboarding-step-5-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './onboarding-step-5.page.html',
  styleUrls: ['./onboarding-step-5.page.scss'],
})
export class OnboardingStep5Page {
  constructor(
    private readonly router: Router,
    private readonly state: OnboardingStateService,
  ) {}

  get systemLabel(): string {
    const systemName = this.state.snapshot.openAi?.systemName ?? 'OpenAI API';
    return systemName.trim() ? systemName : 'OpenAI API';
  }

  get riskRuleLabel(): string {
    switch (this.state.snapshot.riskTemplate) {
      case 'legal-contracts':
        return 'Legal Contracts Analysis';
      case 'hr-hiring':
        return 'HR & Hiring';
      case 'customer-content':
        return 'Customer-Facing Content';
      case 'financial-pricing':
        return 'Financial & Pricing';
      default:
        return 'Legal Contracts Analysis';
    }
  }

  back(): void {
    this.router.navigate(['/onboarding/step-4']);
  }

  finishSetup(): void {
    this.state.clear();
    this.router.navigate(['/dashboard']);
  }
}
