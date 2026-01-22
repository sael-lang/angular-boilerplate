import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dash-icon-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dash-icon-button.component.html',
  styleUrls: ['./dash-icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashIconButtonComponent {
  @Input() ariaLabel = 'Action';
  @Output() clicked = new EventEmitter<void>();
}
