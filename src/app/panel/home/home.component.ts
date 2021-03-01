import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../layout/sidebar/sidebar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loading = true;
  constructor(private sidebarService: SidebarService) { 
  }

  ngOnInit(): void {

    setTimeout(() => {
      this.loading = false;
    }, 3000);

    this.sidebarService.changeSubMenu({
      title: 'Dashboard',
      description: 'Essa é home do sistema. Somente usuários logados podem chegar até aqui',
      linkList: [
        {
          icon: 'bt-bar-chart',
          title: 'Exemplo 1',
          url: '/',
          fragment: 'resumo',
          fragmentActive: true,
        },
        {
          icon: 'bt-filter',
          title: 'Exemplo 2',
          url: '/',
          fragment: 'resumo',
        },
        {
          icon: 'bt-admin',
          title: 'Exemplo 3',
          url: '/',
          fragment: 'resumo',
        },
      ]
    });
  }

}
