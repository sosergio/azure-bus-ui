import { LoggerService } from './../../common/services/logger.service';
import { AppConfigService } from './../../common/services/app-config.service';
import { NotFoundError, ApplicationError } from './../../common/models/errors';
import { Router } from '@angular/router';
import { AppErrorsService } from './app-errors.service';
import { Injectable, ErrorHandler, Injector } from "@angular/core";

@Injectable()
export class AppErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error) {
    let router = this.injector.get(Router);
    let errorsService = this.injector.get(AppErrorsService);
    let appConfigService = this.injector.get(AppConfigService);
    let loggerService = this.injector.get(LoggerService);

    errorsService.lastError.next(error);
    loggerService.error(error);
    if (error.name == NotFoundError.name) {
      router.navigate(['/errors', 'not-found']);
    }
    else if (appConfigService.getConfigs().isProduction) {
      if (error.name == ApplicationError.name) {
        if (error.unrecoverable) {
          router.navigate(['/errors', 'application']);
        }
      }
    }
  }
}
