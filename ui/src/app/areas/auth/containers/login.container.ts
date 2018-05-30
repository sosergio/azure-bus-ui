import { HttpClient } from '@angular/common/http';
import { UserContextService } from './../../../common/services/user-context.service';
import { AuthService } from './../../../common/services/auth.service';
import { ApiResource } from './../../../common/resources/api.resource';
import { NotificationService } from './../../../common/services/notification-service';
import { AppErrorsService } from './../../../errors/services/app-errors.service';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'login-container',
  templateUrl:'./login.container.html'
})
export class LoginContainer {
  loginResponse: any;
  formSubmitted = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private userContext: UserContextService,
    private notificationService: NotificationService,
    private http: HttpClient
  ) {
    this.userContext.logout();
  }

  loginClick() {
    this.formSubmitted = true;
    this.http.get(`${environment.apiUrl}/azure/login`).subscribe(s => {
      console.log(s);
      this.loginResponse = s;
      const loop = setInterval(() => {
        this.http.get(`${environment.apiUrl}/azure/login/${this.loginResponse.id}`).subscribe(loginObj => {
          console.log(loginObj);
          if (loginObj['credentials']) {
            const info = loginObj['credentials']['tokenCache']._entries[0];
            this.userContext.login(info.accessToken, info.expiresOn, info.refreshToken);
            this.router.navigate(['/user-context']);
            clearInterval(loop);
          } else if (loginObj['error']) {
            clearInterval(loop);
          }
        });
      }, 5000);
    });
  }

  urlify(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
      return '<a href="' + url + '">' + url + '</a>';
    });
  }
}
