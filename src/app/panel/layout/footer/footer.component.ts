import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/common/config/app.config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  logo = AppConfig.logo;
  theme = AppConfig.theme;

  constructor() { }

  ngOnInit(): void {
  }

}
