import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-requests-list',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './requests-list.component.html',
})
export class RequestsListComponent {}
