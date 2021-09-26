import {LoggableConfiguration} from './contracts/loggable-configuration';
import {LoggingLevel} from './enumerations/logging-level';

export const getConfiguration: (configuration?: LoggableConfiguration) => LoggableConfiguration = (configuration?: LoggableConfiguration) => {
  let defaultConfiguration: LoggableConfiguration = {
    consoleLoggingLevel: LoggingLevel.all,
    enteringText: 'Entering...',
    exitingText: 'Exiting ({exitTime}ms elapsed)...',
    prefixText: 'LOGGABLE-{loggingLevel} {padEnd:16}{className}@{methodName}: {padEnd:30}'
  };

  if (configuration === undefined) {
    return defaultConfiguration;
  }

  if (configuration.consoleLoggingLevel !== undefined) {
    defaultConfiguration.consoleLoggingLevel = configuration.consoleLoggingLevel;
  }

  if (configuration.enteringText !== undefined) {
    defaultConfiguration.enteringText = configuration.enteringText;
  }

  if (configuration.exitingText !== undefined) {
    defaultConfiguration.exitingText = configuration.exitingText;
  }

  if (configuration.prefixText !== undefined) {
    defaultConfiguration.prefixText = configuration.prefixText;
  }

  return defaultConfiguration;
}

export const isEmptyOrWhiteSpace: (value: string) => boolean = (value: string) => {
  return value === undefined || value === null || value === '' || value.match(/^ *$/) !== null;
}

export const formatString: (format: string, placeholders?: any) => string = (format: string, placeholders?: any) => {
  if (placeholders !== undefined) {
    format = replacePlaceholders(format, placeholders);
  }

  format = applyPadEnd(format);

  return format;
}

const replacePlaceholders: (value: string, placeholders: any) => string = (value: string, placeholders: any) => {
  for (const propertyName of Object.getOwnPropertyNames(placeholders)) {
    const propertyDescriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(placeholders, propertyName);

    if (propertyDescriptor === undefined) {
      continue;
    }

    value = value.replace(new RegExp(`{${propertyName}}`, 'g'), propertyDescriptor.value);
  }

  return value;
}

const applyPadEnd: (value: string) => string = (value: string) => {
  const matches: RegExpMatchArray | null = value.match(/.*?{padEnd:\d+}/g);

  if (matches !== null) {
    for (let match of matches) {
      const matches: RegExpMatchArray | null = match.match(/{padEnd:(\d+)}/);

      if (matches !== null) {
        const maxLength: number = parseInt(matches[1]);
        let paddedString = match.replace(/{padEnd:\d+}/, '');
        paddedString = paddedString.padEnd(maxLength);
        value = value.replace(match, paddedString);
      }
    }
  }

  return value;
}
