import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  showToastUpdateSoftware = false;
  constructor(private swUpdate: SwUpdate ){}
  ngOnInit(){
    this.swUpdate.available.subscribe(evt => {
      this.showToastUpdateSoftware = true;
    });
  }
}
