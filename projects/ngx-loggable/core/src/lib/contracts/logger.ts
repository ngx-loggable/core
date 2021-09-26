export interface Logger {

  trace(...data: any[]): void;

  debug(...data: any[]): void;

  info(...data: any[]): void;

  warn(...data: any[]): void;

  error(...data: any[]): void;

  fatal(...data: any[]): void;

}
