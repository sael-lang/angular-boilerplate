import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dash-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dash-search.component.html',
  styleUrls: ['./dash-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashSearchComponent {
  @Input() value = '';
  @Input() placeholder = 'Search…';

  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event): void {
    this.valueChange.emit((event.target as HTMLInputElement).value);
  }
}
