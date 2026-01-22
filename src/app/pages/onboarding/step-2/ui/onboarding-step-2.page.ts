import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingStateService } from '../../data-access/onboarding-state.service';

@Component({
  selector: 'app-onboarding-step-2-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './onboarding-step-2.page.html',
  styleUrls: ['./onboarding-step-2.page.scss'],
})
export class OnboardingStep2Page {
  constructor(
    private readonly router: Router,
    private readonly state: OnboardingStateService,
  ) {}

  openAiEnabled = true;
  anthropicEnabled = false;
  customApiEnabled = false;

  testing = false;
  testResult?: 'success' | 'error';

  readonly openAiForm = new FormGroup({
    apiKey: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    systemName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  back(): void {
    this.router.navigate(['/onboarding/step-1']);
  }

  skipForNow(): void {
    this.router.navigate(['/dashboard']);
  }

  toggleProvider(provider: 'openai' | 'anthropic' | 'custom'): void {
    if (provider === 'openai') {
      this.openAiEnabled = !this.openAiEnabled;
      return;
    }

    if (provider === 'anthropic') {
      this.anthropicEnabled = !this.anthropicEnabled;
      return;
    }

    this.customApiEnabled = !this.customApiEnabled;
  }

  testConnection(): void {
    if (!this.openAiEnabled || this.openAiForm.invalid || this.testing) {
      this.openAiForm.markAllAsTouched();
      return;
    }

    this.testing = true;
    this.testResult = undefined;

    setTimeout(() => {
      this.testing = false;
      this.testResult = 'success';
    }, 700);
  }

  saveAndContinue(): void {
    if (!this.openAiEnabled || this.openAiForm.invalid) {
      this.openAiForm.markAllAsTouched();
      return;
    }

    this.state.setOpenAi(this.openAiForm.controls.systemName.value);
    this.router.navigate(['/onboarding/step-3']);
  }
}
