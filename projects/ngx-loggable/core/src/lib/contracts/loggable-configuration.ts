import {LoggingLevel} from '../enumerations/logging-level';

export interface LoggableConfiguration {

  consoleLoggingLevel?: LoggingLevel;
  enteringText?: string;
  exitingText?: string;
  prefixText?: string;

}
