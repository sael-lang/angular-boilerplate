import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RangeOptionVm } from '../../models/dashboard.model';

@Component({
  selector: 'app-dash-range-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dash-range-chip.component.html',
  styleUrls: ['./dash-range-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashRangeChipComponent {
  @Input({ required: true }) options!: RangeOptionVm[];
  @Input({ required: true }) selected!: RangeOptionVm;
  @Input() open = false;

  @Output() toggle = new EventEmitter<void>();
  @Output() select = new EventEmitter<RangeOptionVm>();
  @Output() close = new EventEmitter<void>();

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  onToggleClick(event: MouseEvent): void {
    event.stopPropagation();
    this.toggle.emit();
  }

  onSelect(option: RangeOptionVm): void {
    this.select.emit(option);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.open) return;
    const target = event.target as Node;
    if (this.el.nativeElement.contains(target)) return;
    this.close.emit();
  }
}
