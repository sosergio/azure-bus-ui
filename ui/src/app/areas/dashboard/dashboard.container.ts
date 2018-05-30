import { UserContext } from './../../common/models/user-context';
import { ApiResource } from './../../common/resources/api.resource';
import { AppConfigService } from './../../common/services/app-config.service';
import { NotificationService } from './../../common/services/notification-service';
import { AppErrorsService } from './../../errors/services/app-errors.service';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { UserContextService } from '../../common/services/user-context.service';
import { Observable } from 'rxjs/Observable';
import { DialogsService } from '../../common/services/dialogs.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.container.html'
})
export class DashboardContainer {
  isLoading = false;
  topics: any;
  selectedTopic: any;
  uc: UserContext;
  tab = 1;
  newSubscrptionName: string;
  showNewSubscriptionNameForm = false;

  constructor(private http: HttpClient, private userContextService: UserContextService, private dialogsService: DialogsService) {
    this.uc = this.userContextService.get();

    this.loadTopics();
  }

  onTopicClick(topic: any) {
    this.selectedTopic = topic;
    this.loadSubscriptions(topic);
  }

  get namespaceApi(): string {
    return `${environment.apiUrl}/azure/subscriptions/${this.uc.subscriptionId}/resource-groups/${this.uc.resourceGroup}/namespaces/${this.uc.namespace}`;
  }

  loadTopics() {
    this.isLoading = true;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.set('x-azure-token', this.uc.accessToken);
    this.http.get(`${this.namespaceApi}/topics`, {
      headers: headers
    }).subscribe(s => {
      this.isLoading = false;
      this.topics = s;
    }, err => {
      this.topics = [];
      this.isLoading = false;
    });
  }

  loadSubscriptions(topic: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.set('x-azure-token', this.uc.accessToken);
    this.http.get(`${this.namespaceApi}/topics/${topic.name}/subscriptions`, {
      headers: headers
    }).subscribe(s =>
      this.selectedTopic.subscriptions = s);
  }

  receiveSubscriptionMessage(topic: any, subscription: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.set('x-azure-cs', this.uc.serviceBusConnectionString);
    this.http.get(`${this.namespaceApi}/topics/${topic.name}/subscriptions/${subscription.name}/message`, {
      headers: headers
    }).subscribe(s => {
      if (s && s['body']) {
        const json = JSON.parse(s['body']);
        subscription.message = json;
      } else {
        subscription.message = 'no message';
      }
    });
  }

  showNewSubscriptionModal() {
    this.dialogsService.prompt('New Subscription', 'Name').subscribe(ans => {
      if (ans) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        headers = headers.set('x-azure-token', this.uc.accessToken);
        this.http.post(`${this.namespaceApi}/topics/${this.selectedTopic.name}/subscriptions`, {
          name: ans
        }, {
            headers: headers
          }).subscribe(s => {
            this.loadSubscriptions(this.selectedTopic);
          });
      }
    });
  }

  onDeleteSubscriptionClick(subscriptionName: string) {
    this.dialogsService.confirm('Delete Subscription', `Are you sure you want to delete '${subscriptionName}'`).subscribe(ans => {
      if (ans) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        headers = headers.set('x-azure-token', this.uc.accessToken);
        this.http.delete(`${this.namespaceApi}/topics/${this.selectedTopic.name}/subscriptions/${subscriptionName}`, {
            headers: headers
          }).subscribe(() => {
            this.loadSubscriptions(this.selectedTopic);
          });
      }
    });
  }
}
