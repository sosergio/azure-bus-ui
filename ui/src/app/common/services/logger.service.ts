import { AppConfigService } from './app-config.service';
import { Injectable } from '@angular/core';
import { LogLevel } from '../models/log-level';


@Injectable()
export class LoggerService {

  private level: LogLevel;
  constructor(private appConfig: AppConfigService) {
    this.level = this.appConfig.getConfigs().logLevel;
  }

  log(message?: any, ...optionalParams: any[]): void {
    if (this.isLogEnabled()) { console.log.apply(console, arguments); }
  }
  warn(message?: any, ...optionalParams: any[]): void {
    if (this.isWarnEnabled()) { console.warn.apply(console, arguments); }
  }
  error(message?: any, ...optionalParams: any[]): void {
    if (this.isErrorEnabled()) { console.error.apply(console, arguments); }
  }

  isErrorEnabled = (): boolean => this.level >= LogLevel.ERROR;
  isWarnEnabled = (): boolean => this.level >= LogLevel.WARN;
  isLogEnabled = (): boolean => this.level >= LogLevel.LOG;

}
