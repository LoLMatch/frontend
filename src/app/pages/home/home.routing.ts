import { Routes } from "@angular/router";
import { RoutesPath } from "@core/constants/routes.const";
import { DashboardComponent } from "@pages/dashboard/dashboard.component";
import { HomeComponent } from "@pages/home/home.component";

export default [
  {
    path: '',
    component: HomeComponent,
    //canActivate:[] TUTAJ wrzucic GUARDA DO AUTENTYKACJI
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: RoutesPath.MESSAGES,
        loadChildren: () => import('../messages/messages.routing')
      }
    ]
  }
] as Routes;