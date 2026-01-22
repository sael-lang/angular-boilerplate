import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KpiVm } from '../../models/dashboard.model';
import { KpiCardComponent } from '../kpi-card.component/kpi-card.component';

@Component({
  selector: 'app-kpi-grid',
  standalone: true,
  imports: [CommonModule, KpiCardComponent],
  templateUrl: './kpi-grid.component.html',
  styleUrls: ['./kpi-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiGridComponent {
  @Input({ required: true }) kpis!: KpiVm[];
}
