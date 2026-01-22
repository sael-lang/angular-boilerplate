export type KpiIcon = 'spark' | 'hourglass' | 'clock' | 'shield';
export type DecisionTone = 'finance' | 'hr' | 'security' | 'legal';
export type StatusLabel = 'APPROVED' | 'PENDING' | 'REJECTED';
export type RiskTone = 'low' | 'med' | 'high';

export interface RangeOptionVm {
  label: string;
  value: string;
}

export interface KpiVm {
  label: string;
  value: string;
  unit?: string;
  delta?: { text: string; tone: 'success' | 'danger' };
  subline?: string;
  icon: KpiIcon;
  miniChart?: { bars: number[] };
  ring?: { value: number; targetLabel: string };
  isActive?: boolean;
}

export interface RiskCardVm {
  title: string;
  legend: Array<{ label: string; tone: RiskTone }>;
  xTicks: string[];
  series: Array<{ tone: RiskTone; points: number[] }>;
}

export interface DecisionsCardVm {
  title: string;
  totalLabel: string;
  items: Array<{ label: string; value: number; pct: number; tone: DecisionTone }>;
}

export interface ActivityRowVm {
  time: string;
  type: string;
  status: StatusLabel;
  approver: string;
  actionLabel: string;
}

export interface ActivityCardVm {
  title: string;
  downloadLabel: string;
  columns: { time: string; type: string; status: string; approver: string; action: string };
  rows: ActivityRowVm[];
}

export interface DashboardVm {
  header: {
    title: string;
    rangeOptions: RangeOptionVm[];
    searchPlaceholder: string;
    notificationsAria: string;
  };
  kpis: KpiVm[];
  riskCard: RiskCardVm;
  decisionsCard: DecisionsCardVm;
  activityCard: ActivityCardVm;
}
