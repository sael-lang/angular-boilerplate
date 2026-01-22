import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-onboarding-welcome',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './onboarding-welcome.component.html',
  styleUrl: './onboarding-welcome.component.scss',
})
export class OnboardingWelcomeComponent {}
