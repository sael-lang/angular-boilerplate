import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingStateService } from '../../data-access/onboarding-state.service';

@Component({
  selector: 'app-onboarding-step-4-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './onboarding-step-4.page.html',
  styleUrls: ['./onboarding-step-4.page.scss'],
})
export class OnboardingStep4Page {
  constructor(
    private readonly router: Router,
    private readonly state: OnboardingStateService,
  ) {}

  readonly testPrompt = new FormControl('Review the attached Mutual NDA for clauses related to indemnity and data privacy. Ensure the governing law is set to New York state.', { nonNullable: true });

  sent = false;

  get systemName(): string {
    return this.state.snapshot.openAi?.systemName ?? 'OpenAI GPT-4';
  }

  get riskScope(): string {
    switch (this.state.snapshot.riskTemplate) {
      case 'legal-contracts':
        return 'Legal Contracts';
      case 'hr-hiring':
        return 'HR & Hiring';
      case 'customer-content':
        return 'Customer Content';
      case 'financial-pricing':
        return 'Financial & Pricing';
      default:
        return 'Legal Contracts';
    }
  }

  back(): void {
    this.router.navigate(['/onboarding/step-3']);
  }

  skipForNow(): void {
    this.router.navigate(['/dashboard']);
  }

  editConfiguration(): void {
    this.router.navigate(['/onboarding/step-2']);
  }

  sendTestRequest(): void {
    this.sent = true;
  }

  continue(): void {
    this.router.navigate(['/onboarding/step-5']);
  }
}
