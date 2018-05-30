import { LoggerService } from './logger.service';
import { LocalStorageService } from './local-storage.service';
import { UserContext } from './../models/user-context';
import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserContextService {

  private USER_CONTEXT_STORAGE_KEY = '___store';

  public onChange$: EventEmitter<UserContext> = new EventEmitter<UserContext>();

  private _userContext: UserContext;
  constructor(private localStorageProvider: LocalStorageService, private logger: LoggerService) {
    const stored = <UserContext>this.localStorageProvider.get(this.USER_CONTEXT_STORAGE_KEY) || new UserContext();
    this.update(stored);
  }

  get() {
    return this._userContext;
  }

  login(accessToken: string, expiresOn: string, refreshToken: string) {
    const uc = this._userContext || new UserContext();
    uc.accessToken = accessToken;
    uc.refreshToken = refreshToken;
    uc.expiresOn = expiresOn;
    this.update(uc);
  }

  isLoggedIn() {
    const uc = this._userContext;
    return uc && uc.accessToken != null && uc.expiresOn != null && new Date() < new Date(uc.expiresOn);
  }

  setAccessTokenExpired() {
    const uc = this._userContext || new UserContext();
    uc.accessToken = null;
    uc.refreshToken = null;
    uc.expiresOn = null;
    this.update(uc);
  }

  logout() {
    this.setAccessTokenExpired();
  }

  update(value: UserContext) {
    this.save(value);
    this.onChange$.emit(this._userContext);
  }

  private save(value: UserContext) {
    this._userContext = value;
    const wr = Object.assign({}, this._userContext);
    this.localStorageProvider.set(this.USER_CONTEXT_STORAGE_KEY, wr);
  }
}
