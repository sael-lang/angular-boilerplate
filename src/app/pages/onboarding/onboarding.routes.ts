import { Routes } from '@angular/router';
import { OnboardingStep1Page } from './step-1/ui/onboarding-step-1.page';
import { OnboardingStep2Page } from './step-2/ui/onboarding-step-2.page';
import { OnboardingStep3Page } from './step-3/ui/onboarding-step-3.page';
import { OnboardingStep4Page } from './step-4/ui/onboarding-step-4.page';
import { OnboardingStep5Page } from './step-5/ui/onboarding-step-5.page';

export const onboardingRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'step-1' },
  { path: 'step-1', component: OnboardingStep1Page },
  { path: 'step-2', component: OnboardingStep2Page },
  { path: 'step-3', component: OnboardingStep3Page },
  { path: 'step-4', component: OnboardingStep4Page },
  { path: 'step-5', component: OnboardingStep5Page },
];
