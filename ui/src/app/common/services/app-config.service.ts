import { AppConfigs } from './../models/app-configs';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigService {

  private _appConfigs;
  public getConfigs(): AppConfigs {
    if (!this._appConfigs) {
      const appConfigs = new AppConfigs();
      appConfigs.isProduction = environment.production;
      appConfigs.apiUrl = environment.apiUrl;
      appConfigs.logLevel = environment.logLevel;
      this._appConfigs = appConfigs;

    }
    return this._appConfigs;
  }
}
