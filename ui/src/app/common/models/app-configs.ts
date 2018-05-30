import { LogLevel } from "./log-level";

export class AppConfigs {
  isProduction: boolean;
  apiUrl: string;
  logLevel: LogLevel;
  constructor() {}

  toString() {
    return `
      Environment used (NODE_ENV):  ${this.isProduction ? 'prod' : 'dev'}
      -------------------------------------------------------
      API_URL : ${ this.apiUrl},
      APP_LOG_LEVEL : ${ this.logLevel}
    `;
  }

}

