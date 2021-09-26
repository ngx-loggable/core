import {LoggableMetadata} from './contracts/loggable-metadata';
import {LoggableConfiguration} from './contracts/loggable-configuration';
import {LoggingLevel} from './enumerations/logging-level';
import {Logger} from './contracts/logger';
import {formatString, isEmptyOrWhiteSpace} from './util';

export class LoggableSingleton implements Logger {

  public static get instance(): LoggableSingleton {
    if (LoggableSingleton._instance === undefined) {
      LoggableSingleton._instance = new LoggableSingleton();
    }

    return LoggableSingleton._instance;
  }

  private readonly _loggableMetadata: LoggableMetadata[];

  private static _instance: LoggableSingleton;

  public pushLoggableMetadata(className: string, methodName: string, loggableConfiguration: LoggableConfiguration): void {
    this._loggableMetadata.push({
      className: className,
      methodName: methodName,
      loggableConfiguration: loggableConfiguration
    });
  }

  public popLoggableMetadata(): void {
    this._loggableMetadata.pop();
  }

  public trace(...data: any[]): void {
    this.log(LoggingLevel.trace, ...data);
  }

  public debug(...data: any[]): void {
    this.log(LoggingLevel.debug, ...data);
  }

  public info(...data: any[]): void {
    this.log(LoggingLevel.info, ...data);
  }

  public warn(...data: any[]): void {
    this.log(LoggingLevel.warn, ...data);
  }

  public error(...data: any[]): void {
    this.log(LoggingLevel.error, ...data);
  }

  public fatal(...data: any[]): void {
    this.log(LoggingLevel.fatal, ...data);
  }

  private constructor() {
    this._loggableMetadata = [];
  }

  private getLoggableMetadata(): LoggableMetadata {
    return this._loggableMetadata[this._loggableMetadata.length - 1];
  }

  private log(loggingLevel: LoggingLevel, ...data: any[]): void {
    const loggableMetadata: LoggableMetadata = this.getLoggableMetadata();

    if (loggableMetadata !== undefined &&
      loggableMetadata.loggableConfiguration !== undefined &&
      loggableMetadata.loggableConfiguration.consoleLoggingLevel !== undefined &&
      loggableMetadata.loggableConfiguration.consoleLoggingLevel >= loggingLevel) {
      const prefixText = formatString(loggableMetadata.loggableConfiguration.prefixText ?? '', {
        loggingLevel: LoggingLevel[loggingLevel].toUpperCase(),
        className: loggableMetadata.className,
        methodName: loggableMetadata.methodName
      })

      switch (loggingLevel) {
        case LoggingLevel.trace:
          if (!isEmptyOrWhiteSpace(prefixText)) {
            console.trace(prefixText, ...data);
          } else {
            console.trace(...data);
          }
          break;
        case LoggingLevel.debug:
          if (!isEmptyOrWhiteSpace(prefixText)) {
            console.debug(prefixText, ...data);
          } else {
            console.debug(...data);
          }
          break;
        case LoggingLevel.info:
          if (!isEmptyOrWhiteSpace(prefixText)) {
            console.info(prefixText, ...data);
          } else {
            console.info(...data);
          }
          break;
        case LoggingLevel.warn:
          if (!isEmptyOrWhiteSpace(prefixText)) {
            console.warn(prefixText, ...data);
          } else {
            console.warn(...data);
          }
          break;
        case LoggingLevel.error:
        case LoggingLevel.fatal:
          if (!isEmptyOrWhiteSpace(prefixText)) {
            console.error(prefixText, ...data);
          } else {
            console.error(...data);
          }
          break;
        default:
          if (!isEmptyOrWhiteSpace(prefixText)) {
            console.log(prefixText, ...data);
          } else {
            console.log(...data);
          }
          break;
      }
    }
  }

}
