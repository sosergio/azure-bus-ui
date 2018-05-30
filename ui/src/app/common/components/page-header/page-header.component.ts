import { AppConfigService } from './../../services/app-config.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'dcas-page-header',
  templateUrl:'./page-header.component.html'
})
export class PageHeaderComponent {
  isMenuOpen: boolean;
  @Input()
  title: string;

  constructor(appConfig:AppConfigService) {

  }
}
