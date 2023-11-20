import { Routes } from "@angular/router";
import { RoutesPath } from "@core/constants/routes.const";
import { AuthComponent } from "@pages/auth/auth.component";

export default [
  {
    path: '',
    redirectTo: RoutesPath.LOGIN,
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: RoutesPath.LOGIN,
        loadComponent: () => import('./pages/login/login.component').then(mod => mod.LoginComponent),
      },
      {
        path: RoutesPath.REGISTER,
        loadComponent: () => import('./pages/register/register.component').then(mod => mod.RegisterComponent),
      },
      {
        path: RoutesPath.FORGOT_PASSWORD,
        loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(mod => mod.ForgotPasswordComponent),
      },
    ]
  }
] as Routes;