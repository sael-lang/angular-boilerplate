import { Routes } from '@angular/router';
import { RequestReviewPage } from './ui/request-review/request-review.page';

export const requestsRoutes: Routes = [{ path: ':requestId', component: RequestReviewPage }];
