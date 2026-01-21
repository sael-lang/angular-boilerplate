import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KpiVm } from '../../models/dashboard.model';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiCardComponent {
  @Input({ required: true }) kpi!: KpiVm;

  ringDash(value: number): { dash: string; offset: string } {
    const r = 26;
    const c = 2 * Math.PI * r;
    const v = Math.max(0, Math.min(100, value));
    const filled = (v / 100) * c;
    const rest = c - filled;
    return { dash: `${filled} ${rest}`, offset: '0' };
  }
}
