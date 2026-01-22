import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-request-detail',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './request-detail.component.html',
  styleUrl: './request-detail.component.scss',
})
export class RequestDetailComponent {
  readonly requestId = this._route.snapshot.paramMap.get('id');

  constructor(private readonly _route: ActivatedRoute) {}
}
