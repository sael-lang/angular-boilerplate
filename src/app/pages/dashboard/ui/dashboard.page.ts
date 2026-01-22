import { ChangeDetectionStrategy, Component, computed, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardVm, RangeOptionVm, ActivityRowVm } from '../models/dashboard.model';

import { DashTopbarComponent } from './dash-topbar/dash-topbar.component';
import { KpiGridComponent } from './kpi-grid.component/kpi-grid.component';
import { RiskCardComponent } from './risk-card.component/risk-card.component';
import { DecisionsCardComponent } from './decisions-card.component/decisions-card.component';
import { ActivityTableComponent } from './activity-table.component/activity-table.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, DashTopbarComponent, KpiGridComponent, RiskCardComponent, DecisionsCardComponent, ActivityTableComponent],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  encapsulation: ViewEncapsulation.None, // ✅ THIS IS THE KEY
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  readonly vm: DashboardVm = {
    header: {
      title: 'Dashboard',
      rangeOptions: [
        { label: 'Last 7 days', value: '7d' },
        { label: 'Last 30 days', value: '30d' },
        { label: 'Last 90 days', value: '90d' },
      ],
      searchPlaceholder: 'Search interactions…',
      notificationsAria: 'Notifications',
    },

    kpis: [
      {
        label: 'TOTAL AI INTERACTIONS',
        value: '2,847',
        delta: { text: '+12%', tone: 'success' },
        icon: 'spark',
        miniChart: { bars: [18, 22, 16, 28, 26, 34, 40, 52, 46, 60] },
      },
      {
        label: 'PENDING APPROVALS',
        value: '3',
        delta: { text: 'Needs attention', tone: 'danger' },
        subline: '2 immediate from Finance Dept.',
        icon: 'hourglass',
        isActive: true,
      },
      {
        label: 'AVG. APPROVAL TIME',
        value: '4.2',
        unit: 'hrs',
        delta: { text: '-8%', tone: 'success' },
        subline: 'Efficiency improved from 4.8',
        icon: 'clock',
      },
      {
        label: 'COMPLIANCE RATE',
        value: '98%',
        icon: 'shield',
        ring: { value: 98, targetLabel: 'Target 95%' },
      },
    ],

    riskCard: {
      title: 'Risk Assessment Timeline',
      legend: [
        { label: 'Low', tone: 'low' },
        { label: 'Med', tone: 'med' },
        { label: 'High', tone: 'high' },
      ],
      xTicks: ['09/15', '09/20', '09/25', '09/30', '10/05'],
      series: [
        { tone: 'low', points: [66, 68, 67, 69, 70, 69, 71, 72, 71] },
        { tone: 'med', points: [44, 46, 45, 47, 46, 45, 46, 48, 50] },
        { tone: 'high', points: [26, 25, 24, 23, 22, 22, 21, 22, 23] },
      ],
    },

    decisionsCard: {
      title: 'Decisions by Category',
      totalLabel: 'Total Decisions',
      items: [
        { label: 'Finance', value: 820, pct: 92, tone: 'finance' },
        { label: 'HR Operations', value: 540, pct: 72, tone: 'hr' },
        { label: 'Security & Infrastructure', value: 410, pct: 58, tone: 'security' },
        { label: 'Legal / GRC', value: 180, pct: 36, tone: 'legal' },
      ],
    },

    activityCard: {
      title: 'Recent Activity',
      downloadLabel: 'Download CSV',
      columns: {
        time: 'TIME',
        type: 'INTERACTION TYPE',
        status: 'STATUS',
        approver: 'PRIMARY APPROVER',
        action: 'ACTION',
      },
      rows: [
        {
          time: '10:42 AM',
          type: 'Credit Limit Increase',
          status: 'APPROVED',
          approver: 'Sarah Jenkins',
          actionLabel: 'View Details',
        },
        {
          time: '09:16 AM',
          type: 'Internal Hiring Request',
          status: 'PENDING',
          approver: 'Unassigned',
          actionLabel: 'View Details',
        },
        {
          time: '08:30 AM',
          type: 'Data Access Provision',
          status: 'APPROVED',
          approver: 'Syedam (Lead)',
          actionLabel: 'View Details',
        },
        {
          time: 'Yesterday',
          type: 'External NDA Approval',
          status: 'REJECTED',
          approver: 'Mary Drost',
          actionLabel: 'View Details',
        },
      ],
    },
  };

  readonly search = signal('');
  readonly selectedRange = signal<RangeOptionVm>(this.vm.header.rangeOptions[1]);
  readonly rangeOpen = signal(false);

  readonly filteredActivities = computed(() => {
    const q = this.search().trim().toLowerCase();
    if (!q) return this.vm.activityCard.rows;

    return this.vm.activityCard.rows.filter((r: ActivityRowVm) => {
      return r.time.toLowerCase().includes(q) || r.type.toLowerCase().includes(q) || r.status.toLowerCase().includes(q) || r.approver.toLowerCase().includes(q);
    });
  });

  setRange(option: RangeOptionVm): void {
    this.selectedRange.set(option);
    this.rangeOpen.set(false);
  }

  toggleRange(): void {
    this.rangeOpen.update((v) => !v);
  }

  closeRange(): void {
    this.rangeOpen.set(false);
  }

  onSearchChange(v: string): void {
    this.search.set(v);
  }

  onBellClick(): void {}
}
