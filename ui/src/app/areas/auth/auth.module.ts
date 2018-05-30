import { LoginContainer } from './containers/login.container';
import { UserContextContainer } from './containers/user-context.container';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ErrorsModule } from '../../errors/errors.module';
import { CommonModule } from '../../common/common.module';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginContainer
  },
  {
    path: 'user-context',
    component: UserContextContainer
  }
];

@NgModule({
  declarations: [
    LoginContainer,
    UserContextContainer
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forChild(routes),
    ErrorsModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AuthModule { }
