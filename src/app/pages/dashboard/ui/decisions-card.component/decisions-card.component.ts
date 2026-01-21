import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecisionsCardVm } from '../../models/dashboard.model';

@Component({
  selector: 'app-decisions-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './decisions-card.component.html',
  styleUrls: ['./decisions-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecisionsCardComponent {
  @Input({ required: true }) vm!: DecisionsCardVm;
}
