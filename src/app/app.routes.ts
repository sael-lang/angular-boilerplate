import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

  // Auth routes first so `/login` doesn't get captured by app shell routes.
  { path: '', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },

  // Main app routes (protected by the shell auth guard).
  { path: '', loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule) },

  // Fallback when no prior route is matched.
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];
