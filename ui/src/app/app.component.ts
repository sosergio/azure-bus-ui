import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

// import * as msRestAzure from 'ms-rest-azure';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  data: any;
  token: any;
  loginObj: any;
  constructor(private http: HttpClient) { }

  login() {
    this.http.get(`${environment.apiUrl}/azure/login`).subscribe(s => {
      console.log(s);
      this.loginObj = s;
      const loop = setInterval(() => {
        this.http.get(`${environment.apiUrl}/azure/login/${this.loginObj.id}`).subscribe(loginObj => {
          console.log(loginObj);
          if (loginObj['credentials']) {
            this.token = loginObj['credentials']['tokenCache']._entries[0].accessToken;
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

  getData() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.set('x-azure-cs', this.token);
    this.http.get(`${environment.apiUrl}/azure/topics`, {
      headers: headers
    }).subscribe(s =>
      this.data = s);
  }

  loadSubscriptions(topic: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.set('x-azure-cs', this.token);
    this.http.get(`${environment.apiUrl}/azure/topics/${topic.name}/subscriptions`, {
      headers: headers
    }).subscribe(s =>
      topic.subscriptions = s);
  }

  receiveSubscriptionMessage(topic: any, subscription: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.set('x-azure-cs', this.token);
    this.http.get(`${environment.apiUrl}/azure/topics/${topic.name}/subscriptions/${subscription.name}/message`, {
      headers: headers
    }).subscribe(s => {
      if (s['body']) {
        const json = JSON.parse(s['body']);
        subscription.message = json;
      }
    });
  }
}
