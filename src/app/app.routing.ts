import { Routes } from "@angular/router";
import { RoutesPath } from "@core/constants/routes.const";
import { LandingPageComponent } from "@pages/landing-page/landing-page.component";
import { PostRegistrationPageComponent } from "@pages/post-registration-page/post-registration-page.component";

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
    path: RoutesPath.POST_REGISTRATION_PAGE,
    component: PostRegistrationPageComponent,
  },
  {
    path: RoutesPath.AUTHORIZATION,
    loadChildren: () => import('./pages/auth/auth.routing')
  },
  {
    path: RoutesPath.HOME,
    loadChildren: () => import('./pages/home/home.routing')
  },
  {
    path: '**',
    redirectTo: RoutesPath.LANDING_PAGE,
    pathMatch: 'full'
  },
] as Routes;
