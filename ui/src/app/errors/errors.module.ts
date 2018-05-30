import { ApplicationErrorComponent } from './containers/application-error.component';
import { AppErrorHandler } from './services/app-error-handler.service';
import { ErrorHandler } from '@angular/core';
import { NotFoundErrorComponent } from './containers/not-found-error.component';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from './../common/common.module';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppErrorsService } from "./services/app-errors.service";

const routes: Routes = [
  {
    path: 'errors',
    children: [
      {
        path: 'not-found',
        component: NotFoundErrorComponent,
        data:{
          title:'Error'
        }
      },
      {
        path: 'application',
        component: ApplicationErrorComponent,
        data:{
          title:'Error'
        }
      }
    ]
  }];

@NgModule({
  declarations: [
    NotFoundErrorComponent,
    ApplicationErrorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CommonModule
  ],
  providers: [
    AppErrorsService
  ],

})
export class ErrorsModule { }
