import { Injectable } from '@angular/core';

export type RiskTemplate = 'legal-contracts' | 'hr-hiring' | 'customer-content' | 'financial-pricing';

export interface OnboardingState {
  openAi?: {
    systemName?: string;
  };
  riskTemplate?: RiskTemplate;
}

const STORAGE_KEY = 'approvalLayer_onboarding_state_v1';

@Injectable({ providedIn: 'root' })
export class OnboardingStateService {
  private state: OnboardingState = this.load();

  get snapshot(): OnboardingState {
    return this.state;
  }

  setOpenAi(systemName: string): void {
    this.state = {
      ...this.state,
      openAi: { ...(this.state.openAi ?? {}), systemName },
    };
    this.save();
  }

  setRiskTemplate(template: RiskTemplate): void {
    this.state = { ...this.state, riskTemplate: template };
    this.save();
  }

  clear(): void {
    this.state = {};
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch {
      // ignore
    }
  }

  private load(): OnboardingState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return {};
      }
      return JSON.parse(raw) as OnboardingState;
    } catch {
      return {};
    }
  }
}
