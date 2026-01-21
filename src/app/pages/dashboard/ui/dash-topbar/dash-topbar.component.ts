import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RangeOptionVm } from '../../models/dashboard.model';

import { DashRangeChipComponent } from '../dash-range-chip.component/dash-range-chip.component';
import { DashSearchComponent } from '../dash-search.component/dash-search.component';
import { DashIconButtonComponent } from '../dash-icon-button.component/dash-icon-button.component';

@Component({
  selector: 'app-dash-topbar',
  standalone: true,
  imports: [CommonModule, DashRangeChipComponent, DashSearchComponent, DashIconButtonComponent],
  templateUrl: './dash-topbar.component.html',
  styleUrls: ['./dash-topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashTopbarComponent {
  @Input({ required: true }) title!: string;

  @Input({ required: true }) rangeOptions!: RangeOptionVm[];
  @Input({ required: true }) selectedRange!: RangeOptionVm;
  @Input() rangeOpen = false;

  @Input() searchValue = '';
  @Input() searchPlaceholder = '';
  @Input() notificationsAria = 'Notifications';

  @Output() rangeToggle = new EventEmitter<void>();
  @Output() rangeSelect = new EventEmitter<RangeOptionVm>();
  @Output() rangeClose = new EventEmitter<void>();

  @Output() searchChange = new EventEmitter<string>();
  @Output() bellClick = new EventEmitter<void>();
}
