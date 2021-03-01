import { Component, OnInit } from '@angular/core';
import { UserConfig } from 'src/app/common/config/user.config';
import { User } from 'src/app/common/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: User = UserConfig;
  constructor() {}

  ngOnInit(): void {}


  onLogOut(): void{

  }
}
