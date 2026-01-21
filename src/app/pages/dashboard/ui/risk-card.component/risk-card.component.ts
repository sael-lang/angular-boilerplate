import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskCardVm } from '../../models/dashboard.model';

@Component({
  selector: 'app-risk-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './risk-card.component.html',
  styleUrls: ['./risk-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskCardComponent {
  @Input({ required: true }) vm!: RiskCardVm;

  seriesPath(points: number[], width = 520, height = 160, pad = 10): string {
    if (!points.length) return '';
    const max = 100;
    const min = 0;

    const innerW = width - pad * 2;
    const innerH = height - pad * 2;
    const step = innerW / (points.length - 1);

    const coords = points.map((v, i) => {
      const x = pad + i * step;
      const y = pad + (1 - (v - min) / (max - min)) * innerH;
      return { x, y };
    });

    let d = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 1; i < coords.length; i++) {
      const prev = coords[i - 1];
      const cur = coords[i];
      const cx = (prev.x + cur.x) / 2;
      const cy = (prev.y + cur.y) / 2;
      d += ` Q ${prev.x} ${prev.y} ${cx} ${cy}`;
    }
    const last = coords[coords.length - 1];
    d += ` T ${last.x} ${last.y}`;
    return d;
  }
}
