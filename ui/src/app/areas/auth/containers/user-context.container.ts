import { HttpClient } from '@angular/common/http';
import { UserContextService } from './../../../common/services/user-context.service';
import { AuthService } from './../../../common/services/auth.service';
import { ApiResource } from './../../../common/resources/api.resource';
import { NotificationService } from './../../../common/services/notification-service';
import { AppErrorsService } from './../../../errors/services/app-errors.service';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { UserContext } from '../../../common/models/user-context';


@Component({
  selector: 'user-context-container',
  templateUrl: './user-context.container.html'
})
export class UserContextContainer {

  input: UserContext;
  token: any;
  userSubscriptions: any;
  selectedUserSubscripion: string;
  resourceGroups: any;
  selectedResourceGroup: string;
  namespaces: any;
  selectedNamespace: string;

  constructor(private http: HttpClient, private userContextService: UserContextService, private router: Router) {
    this.input = this.userContextService.get();
    this.token = this.input.accessToken;
    this.selectedNamespace = this.input.namespace;
    this.selectedResourceGroup = this.input.resourceGroup;
    this.selectedUserSubscripion = this.input.subscriptionId;
    this.loadUserSubscriptions();
  }

  onSubscriptionChanged(s) {
    this.selectedUserSubscripion = s;
    this.loadResourceGroups();
  }

  onResourceGroupChanged(group) {
    this.selectedResourceGroup = group;
    this.loadNamespaces();
  }

  onNamespaceChanged(ns) {
    this.selectedNamespace = ns;
  }

  loadUserSubscriptions() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.set('x-azure-token', this.token);

    this.http.get(`${environment.apiUrl}/azure/subscriptions`, {
      headers: headers
    }).subscribe((data: any) => {
      this.userSubscriptions = data;
      if (!this.selectedUserSubscripion && data && data.length > 0) {
        this.selectedUserSubscripion = data[0].subscriptionId;
      }
      if (this.selectedUserSubscripion) {
        this.loadResourceGroups();
      }
    });
  }

  loadResourceGroups() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.set('x-azure-token', this.token);

    this.http.get(`${environment.apiUrl}/azure/subscriptions/${this.selectedUserSubscripion}/resource-groups`, {
      headers: headers
    }).subscribe((data: any) => {
      this.resourceGroups = data;
      if (!data || data.length === 0) {
        this.selectedResourceGroup = null;
      } else if (!this.selectedResourceGroup || !data.find(d => d.name === this.selectedResourceGroup)) {
        this.selectedResourceGroup = data[0].name;
      }
      if (this.selectedResourceGroup) {
        this.loadNamespaces();
      }
    });
  }

  loadNamespaces() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.set('x-azure-token', this.token);
    this.http.get(`${environment.apiUrl}/azure/subscriptions/${this.selectedUserSubscripion}/resource-groups/${this.selectedResourceGroup}/namespaces`, {
      headers: headers
    }).subscribe((data: any) => {
      this.namespaces = data;
      if (!data || data.length === 0) {
        this.selectedNamespace = null;
      } else if (!this.selectedNamespace || !data.find(d => d.name === this.selectedNamespace)) {
        this.selectedNamespace = data[0].name;
      }
    });
  }

  save() {
    this.input.subscriptionId = this.selectedUserSubscripion;
    this.input.resourceGroup = this.selectedResourceGroup;
    this.input.namespace = this.selectedNamespace;
    this.userContextService.update(this.input);
    this.router.navigate(['/dashboard']);
  }

}
