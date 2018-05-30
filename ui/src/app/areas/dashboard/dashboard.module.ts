import { DashboardContainer } from './dashboard.container';
import { AuthGuard } from './../auth/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ErrorsModule } from '../../errors/errors.module';
import { CommonModule } from '../../common/common.module';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardContainer,
    canActivate: [
      AuthGuard
    ]
  }
];

@NgModule({
  declarations: [
    DashboardContainer
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forChild(routes),
    ErrorsModule,
    CommonModule,
    FormsModule
  ]

})
export class DashboardModule { }
