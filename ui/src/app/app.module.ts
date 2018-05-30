
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DashboardModule } from './areas/dashboard/dashboard.module';
import { AuthModule } from './areas/auth/auth.module';
import { AppConfigService } from './common/services/app-config.service';
import { CommonModule } from './common/common.module';
import { NotFoundErrorComponent } from './errors/containers/not-found-error.component';
import { ErrorsModule } from './errors/errors.module';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppHeaderModule } from './areas/app-header/app-header.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  { path: '**', component: NotFoundErrorComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: false }  // <-- debugging purposes only)
    ),

    FormsModule,
    //angular material
    BrowserAnimationsModule,

    //app's modules
    ErrorsModule,
    CommonModule,
    DashboardModule,
    AuthModule,
    AppHeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
