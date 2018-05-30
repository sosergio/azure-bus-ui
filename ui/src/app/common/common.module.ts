import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ApiResource } from './resources/api.resource';
import { DialogComponent } from './components/dialog/dialog.component';
import { DateService } from './services/date-service';
import { PaginatorComponent } from './components/paginator/paginator.components';
import { NotificationService } from './services/notification-service';
import { LoaderComponent } from './components/loader/loader.component';
import { LocalizeDirective } from './directives/localize.directive';
import { LocalizeService } from './services/localize.service';
import { LoggerService } from './services/logger.service';
import { AppConfigService } from './services/app-config.service';
import { UserContextService } from './services/user-context.service';
import { LocalStorageService } from './services/local-storage.service';
import { NgModule } from '@angular/core';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NotificationSnackBarComponent } from "./components/notification-snack-bar/notification-snack-bar.component";
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatSelectModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, MatSlideToggleModule, MatDialogModule, MatSnackBarModule, MatTableModule } from '@angular/material';
//importing common classes
import "./classes/array-extensions";
import "./classes/enum-extensions";
import "./classes/string-extensions";
import "./classes/rxjs-imports";

import { DialogsService } from "./services/dialogs.service";
import { UnauthorizedInterceptor } from './classes/unauthorized-interceptor';

const elements = [
  PageHeaderComponent,
  LocalizeDirective,
  LoaderComponent,
  NotificationSnackBarComponent,
  PaginatorComponent,

];
const entryComponents = [
  DialogComponent
];

const matModules = [
  MatDialogModule,
  MatSnackBarModule,
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatSelectModule,
  MatMenuModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTableModule
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    matModules,
    HttpClientModule
  ],
  declarations: [
    elements,
    entryComponents
  ],
  exports: [
    elements,
    matModules
  ],
  providers: [
    HttpClientModule,
    LocalStorageService,
    UserContextService,
    LoggerService,
    LocalizeService,
    NotificationService,
    DateService,
    DialogsService,
    ApiResource,
    AppConfigService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    }
  ],
  entryComponents: entryComponents

})
export class CommonModule { }
