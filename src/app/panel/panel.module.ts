import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbComponent } from '../common/components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent, LayoutComponent, BreadcrumbComponent],
  imports: [
    CommonModule,
    PanelRoutingModule,
    NgbModule,
  ]
})
export class PanelModule { }
