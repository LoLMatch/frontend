import { Routes } from '@angular/router';
import { RoutesPath } from '@core/constants/routes.const';
import { AuthGuard } from '@core/guards/auth.guard';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { HomeComponent } from '@pages/home/home.component';

export default [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: RoutesPath.MESSAGES,
        loadChildren: () => import('@pages/messages/messages.routing'),
      },
      {
        path: RoutesPath.RECOMMENDATIONS,
        loadChildren: () => import('@pages/recommendations/recommendations.routing'),
      }
    ],
  },
] as Routes;
