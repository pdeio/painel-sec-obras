import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../common/components/page-not-found/page-not-found.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [

  { 
    path: '',
    component: LayoutComponent,
    data: {
      breadcrumb: null,
    },
    children: [
      {
        path: '',
        data: {
          breadcrumb: null,
        },
        loadChildren: () => import('./home/home.module').then(
          (m) => m.HomeModule
        ),
      }, 
    ],
  },
  {
    path: '**',
    data: {
      breadcrumb: null,
    },
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: PageNotFoundComponent
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
