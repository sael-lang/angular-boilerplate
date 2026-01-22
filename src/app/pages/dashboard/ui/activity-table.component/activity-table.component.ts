import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRowVm, StatusLabel } from '../../models/dashboard.model';

@Component({
  selector: 'app-activity-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityTableComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) downloadLabel!: string;

  @Input({ required: true })
  columns!: { time: string; type: string; status: string; approver: string; action: string };

  @Input({ required: true }) rows!: ActivityRowVm[];

  @Output() downloadClick = new EventEmitter<void>();
  @Output() rowActionClick = new EventEmitter<ActivityRowVm>();

  statusClass(status: StatusLabel): string {
    return (
      {
        APPROVED: 'status--approved',
        PENDING: 'status--pending',
        REJECTED: 'status--rejected',
      } as const
    )[status];
  }
}
