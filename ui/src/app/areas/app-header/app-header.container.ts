import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { UserContextService } from '../../common/services/user-context.service';
import { UserContext } from '../../common/models/user-context';
import * as Moment from 'moment';

@Component({
  selector: 'app-header',
  template: `
    <div id='app-header'>
      <h2>AZURE-BUS-UI</h2>
      <div class="namespace"><a class="button secondary small" (click)="userContextClick()">
      <span class="material-icons">chevron_right</span>{{namespace}}
      </a></div>
      <div *ngIf="isLoggedIn">Token Expires: {{tokenExpiresOn}}</div>
      <a *ngIf="isLoggedIn" class="button secondary small" (click)="logoutClick()">
      <span class="material-icons">exit_to_app</span>Logout</a>
    </div>
    `

})
export class AppHeaderContainer implements OnDestroy {
  namespace: string;
  isLoggedIn: boolean;
  tokenExpiresOn: string;
  timer: any;
  constructor(
    private userContextService: UserContextService,
    private router: Router
  ) {
    this.onUserContextSet(this.userContextService.get());
    this.userContextService.onChange$.subscribe(uc => this.onUserContextSet(uc));
    this.timer = setInterval((self) => {

      self.onUserContextSet(this.userContextService.get());
    }, 1000, this);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  onUserContextSet(uc: UserContext) {
    this.isLoggedIn = this.userContextService.isLoggedIn();
    this.tokenExpiresOn = uc && uc.expiresOn ? this.fromNow(uc.expiresOn) : null;
    this.namespace = uc.namespace;
    if (!this.isLoggedIn) {
      this.logoutClick();
    }
  }

  logoutClick() {
    this.userContextService.logout();
    this.router.navigate(['/login']);
  }

  userContextClick() {
    this.router.navigate(['/user-context']);
  }

  fromNow(date: string): string {
    const m = Moment(date);
    return m.fromNow();
  }
}
