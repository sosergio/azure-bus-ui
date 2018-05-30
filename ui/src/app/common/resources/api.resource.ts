import { NotificationService } from './../services/notification-service';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserContextService } from './../services/user-context.service';
import { RequestOptionsArgs, Headers, Response } from '@angular/http';
import { AppConfigService } from './../services/app-config.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiResource {

  url: string;
  requiresAccessToken: boolean;

  constructor(
    protected http: HttpClient,
    protected appConfigService: AppConfigService,
    protected userContextService: UserContextService,
    protected notificationService: NotificationService
  ) { }

  protected init(): ApiResource {
    this.url = this.appConfigService.getConfigs().apiUrl;
    return this;
  }

  public toString() {
    return this.url;
  }


  logins(): ApiResource {
    this.requiresAccessToken = false;
    return this.init()
      .append('users-service/logins');
  }

  one(id: string): ApiResource {
    this.url += `/${id}`;
    return this;
  }

  append(text: string): ApiResource {
    this.url += `/${text}`;
    return this;
  }

  appendQs(qs: string): ApiResource {
    this.url += qs;
    return this;
  }

  setHeaders(input: any) {
    let options = Object.assign({}, input);
    if (!options) {
      options = {};
    }
    let headers = options.headers || new HttpHeaders();
    if (this.requiresAccessToken) {
      const accessToken = this.userContextService.get().accessToken;
      if (accessToken) {
        headers = headers.set('Authorization', `Bearer ${accessToken}`);
      }
    }
    headers = headers.set('Version', '1');
    options.headers = headers;
    return options;
  }

  httpGet(options?: any): Promise<any> {
    options = this.setHeaders(options);
    return this.http.get(this.url, options)
      .toPromise()
      .catch(err => {
        this.handleError(err);
        throw err;
      });
  }

  /**
   * Performs a request with `post` http method.
   */
  httpPost(body: any, options?: any): Promise<any> {
    options = this.setHeaders(options);
    return this.http
      .post(this.url, body, options).toPromise()
      .catch(err => {
        this.handleError(err);
        throw err;
      });
  }
  /**
   * Performs a request with `put` http method.
   */
  httpPut(body: any, options?: any): Promise<any> {
    options = this.setHeaders(options);
    return this.http
      .put(this.url, body, options).toPromise()
      .catch(err => {
        this.handleError(err);
        throw err;
      });
  }
  /**
   * Performs a request with `delete` http method.
   */
  httpDelete(options?: any): Promise<any> {
    options = this.setHeaders(options);
    return this.http
      .delete(this.url, options).toPromise()
      .catch(err => {
        this.handleError(err);
        throw err;
      });
  }
  /**
   * Performs a request with `patch` http method.
   */
  httpPatch(body: any, options?: any): Promise<any> {
    options = this.setHeaders(options);
    return this.http
      .patch(this.url, body, options).toPromise()
      .catch(err => {
        this.handleError(err);
        throw err;
      });
  }

  handleError(err) {
    let message = 'Something went wrong';
    if (err) {
      try {
        const jsonErr = JSON.parse(err);
        message = (jsonErr && jsonErr.message) || message;
      } catch (e) { }
    }
    this.notificationService.error(message);
  }

}
