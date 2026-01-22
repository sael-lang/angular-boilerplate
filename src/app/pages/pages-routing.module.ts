import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/services/shell.service';
import { DashboardPage } from '@pages/dashboard/ui/dashboard.page';
import { requestsRoutes } from '@pages/requests';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'dashboard',
    },
    {
      path: 'dashboard',
      component: DashboardPage,
    },
    {
      path: 'users',
      loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
    },
    {
      path: 'requests',
      children: requestsRoutes,
    },

    // Fallback when no prior route is matched
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
