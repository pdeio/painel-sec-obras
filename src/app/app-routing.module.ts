import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateTeam } from './auth/auth.guard';
import { PageNotFoundComponent } from './common/components/page-not-found/page-not-found.component';
import { BasicRoutes } from './common/config/routes.config';

const routes: Routes = [
  {
    path: BasicRoutes.signIn,
    loadChildren: () => import('./auth/sign-in/sign-in.module').then(
      (m) => m.SignInModule
    ),
  },
  {
    path: BasicRoutes.signUp,
    loadChildren: () => import('./auth/sign-up/sign-up.module').then(
      (m) => m.SignUpModule
    ),
  },
  {
    path: '',
    canActivate: [CanActivateTeam],
    loadChildren: () => import('./panel/panel.module').then(
      (m) => m.PanelModule
    ),
  },
  { path: BasicRoutes.pageNotFound, component: PageNotFoundComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
