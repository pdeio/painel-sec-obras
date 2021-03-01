import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfig } from 'src/app/common/config/app.config';
import { SidebarRoutes } from 'src/app/common/config/routes.config';
import { SidebarService, SubMenu } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  themeSelected = AppConfig.theme;
  logo = AppConfig.logo;
  mainRoutes = SidebarRoutes;
  subMenuForceOpened = false;
  @ViewChild('component', { read: ViewContainerRef }) entry: ViewContainerRef;
  sub: Subscription;
  subMenu: SubMenu;
  componentRef: ComponentRef<any>;
  constructor(
    private sidebarService: SidebarService,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.sub = this.sidebarService.currentSubMenu.subscribe(
      (subMenu: SubMenu) => {
        this.subMenu = subMenu;
        if (subMenu.custom) {
          this.createComponent(subMenu.custom, subMenu.customConfig ?? null);
        } else {
          if (this.componentRef) {
            this.destroyComponent();
          }
        }
      }
    );
  }

  ngOnDestroy() {
    this.sub!.unsubscribe();
    if (this.componentRef) {
      this.destroyComponent();
    }
  }
  createComponent(component: any, config?: object): void {
    this.entry?.clear();
    const factory = this.resolver.resolveComponentFactory(component);
    this.componentRef = this.entry.createComponent(factory);
    if (config) {
      for (const entry of Object.entries(config)) {
        this.componentRef.instance[entry[0]] = entry[1];
      }
    }
  }
  destroyComponent(): void {
    this.componentRef.destroy();
  }
}
