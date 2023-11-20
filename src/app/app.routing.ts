import { Routes } from "@angular/router";
import { RoutesPath } from "@core/constants/routes.const";
import { LandingPageComponent } from "@pages/landing-page/landing-page.component";

export default [
  {
    path: '',
    redirectTo: RoutesPath.LANDING_PAGE,
    pathMatch: 'full'
  },
  {
    path: RoutesPath.LANDING_PAGE,
    component: LandingPageComponent,
  },
  {
    path: RoutesPath.AUTHORIZATION,
    loadChildren: () => import('./pages/auth/auth.routing')
  },
  {
    path: RoutesPath.HOME,
    loadChildren: () => import('./pages/home/home.routing')
  }
] as Routes;