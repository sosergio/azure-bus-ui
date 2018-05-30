import { AppConfigService } from './app-config.service';
import { Observable } from 'rxjs/Observable';
import { ApiResource } from './../resources/api.resource';
import { Http, Response } from '@angular/http';
import { AppConfigs } from './../models/app-configs';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor(
    private apiResource: ApiResource,
    private appConfigService: AppConfigService
  ) { }

  login(email: string, password: string): Promise<any> {

    return this.apiResource.logins().httpPost({
      email: email,
      password: password
    });
  }

  loginWithRefreshToken(refreshToken: string): Promise<any> {
    return this.apiResource.logins().append(refreshToken).httpPost(null);
  }
}
