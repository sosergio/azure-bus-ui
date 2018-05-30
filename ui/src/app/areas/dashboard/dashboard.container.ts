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
  constructor(private http: HttpClient, private userContextService: UserContextService) {
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
      if (s['body']) {
        const json = JSON.parse(s['body']);
        subscription.message = json;
      }
    });
  }
}
