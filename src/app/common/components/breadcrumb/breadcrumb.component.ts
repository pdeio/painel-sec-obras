import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}
  sub: Subscription;
  menuItems: any;
  ngOnInit(): void {
    this.menuItems = this.buildBreadCrumb(this.activatedRoute.root);
    this.sub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(
        () => (this.menuItems = this.buildBreadCrumb(this.activatedRoute.root))
      );
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  buildBreadCrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Array<BreadCrumb> = []
  ): Array<BreadCrumb> {
    // If no routeConfig is avalailable we are on the root path

    let bLabel = 'Início';
    let path = '';
    if (route.routeConfig) {
      path = route.routeConfig.path;
      switch (path) {
        case ':id':
          bLabel = '';
          this.sub = route.params.subscribe((r: any) => {
            path = r.id;
          });
          break;
        case '**':
          this.sub = route.url.subscribe((r: any) => {
            bLabel = this.getLastPartUrl(r[0].path);
            path = r[0].path;
          });
          break;
        default:
          bLabel = route.routeConfig.data?.breadcrumb;
          break;
      }
    }

    // In the routeConfig the complete path is not available,
    // so we rebuild it each time
    const nextUrl = `${url}${path}/`;
    const breadcrumb = {
      label: bLabel,
      url: nextUrl,
    };
    const newBreadcrumbs = [...breadcrumbs, breadcrumb];
    if (route.firstChild) {
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }

  /**
   * Get label from last part of the URL, util for fakes urls
   * @param url string
   */
  getLastPartUrl(url: string): string {
    const a = url.replace('-', ' ');
    return a;
  }
}

export interface BreadCrumb {
  label: string;
  url: string;
}
