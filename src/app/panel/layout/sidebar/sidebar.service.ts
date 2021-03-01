import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  voidSubMenu: SubMenu = {
    title: '',
    description: '',
    linkList: [],
  };

  private subMenuSource = new BehaviorSubject(this.voidSubMenu);
  //private routesSource = new BehaviorSubject(MainRoutes);
  currentSubMenu = this.subMenuSource.asObservable();
  //currentRoutes = this.routesSource.asObservable();



  public getCurrentSubMenu(): SubMenu {
    return this.subMenuSource.getValue();
  }

  /**
   * Changes sidebar's submenu, with component data
   *  
   * @param menu : Submenu
   * 
   * 
   * interface SubMenu {
   *  title: string;
   *  description: string;
   *  linkList: Link[];
   *  custom?: any;
   * customConfig?: object;
   * }
   * 
   */
  public changeSubMenu(menu: SubMenu): void {
    this.subMenuSource.next(menu);
  }
}
export interface SubMenu {
  title: string;
  description: string;
  linkList: Link[];
  custom?: any;
  customConfig?: object;
}
export interface Link {
  icon: string;
  title: string;
  url: string;
  disabled?: boolean;
  fragment?: string;
  fragmentActive?: boolean;
}
