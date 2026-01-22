import { Routes } from '@angular/router';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { RequestsListComponent } from './list/requests-list.component';
import { RequestDetailComponent } from './detail/request-detail.component';

export const requestsRoutes: Routes = [
  {
    path: '',
    component: RequestsListComponent,
    data: { title: marker('Requests') },
  },
  {
    path: ':id',
    component: RequestDetailComponent,
    data: { title: marker('Request') },
  },
];
