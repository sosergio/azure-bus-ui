import { AppHeaderContainer } from './app-header.container';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ErrorsModule } from '../../errors/errors.module';
import { CommonModule } from '../../common/common.module';

@NgModule({
  declarations: [
    AppHeaderContainer
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    AppHeaderContainer
  ]
})
export class AppHeaderModule { }
