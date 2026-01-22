import { Routes } from '@angular/router';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { OnboardingWelcomeComponent } from './step-1/onboarding-welcome.component';
import { OnboardingConnectAiSystemsComponent } from './step-2/onboarding-connect-ai-systems.component';
import { OnboardingRiskRulesComponent } from './step-3/onboarding-risk-rules.component';
import { OnboardingFinalReviewComponent } from './step-4/onboarding-final-review.component';
import { OnboardingTestFinishComponent } from './step-5/onboarding-test-finish.component';

export const onboardingRoutes: Routes = [
  {
    path: '',
    component: OnboardingWelcomeComponent,
    data: { title: marker('Onboarding Step 1 - Welcome | ApprovalLayer') },
  },
  {
    path: 'step-2',
    component: OnboardingConnectAiSystemsComponent,
    data: { title: marker('Onboarding Step 2 - Connect AI Systems | ApprovalLayer') },
  },
  {
    path: 'step-3',
    component: OnboardingRiskRulesComponent,
    data: { title: marker('Onboarding Step 3 - Risk Rules | ApprovalLayer') },
  },
  {
    path: 'step-4',
    component: OnboardingFinalReviewComponent,
    data: { title: marker('Onboarding Step 4 - Final Review | ApprovalLayer') },
  },
  {
    path: 'step-5',
    component: OnboardingTestFinishComponent,
    data: { title: marker('Onboarding Step 5 - Test & Finish | ApprovalLayer') },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
