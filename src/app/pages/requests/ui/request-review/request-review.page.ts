import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-request-review-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './request-review.page.html',
  styleUrls: ['./request-review.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestReviewPage {
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);

  readonly requestId = this.route.snapshot.paramMap.get('requestId') ?? 'REQ-20240115-847';

  constructor() {
    this.title.setTitle(`Approval Request Review - ${this.requestId}`);
  }
}
