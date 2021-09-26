import {LoggableDecorator} from './contracts/loggable-decorator';
import {LoggableConfiguration} from './contracts/loggable-configuration';
import {formatString, getConfiguration} from './util';
import {LoggingLevel} from './enumerations/logging-level';
import {LoggableSingleton} from './loggable-singleton';

export class LoggableFactory {

  public static create(): LoggableDecorator {
    const loggableFactory: LoggableFactory = new LoggableFactory();
    return Object.assign((configuration?: LoggableConfiguration): ClassDecorator => (constructor: any): any => loggableFactory.decorate(constructor, configuration));
  }

  private decorate(constructor: any, configuration?: LoggableConfiguration): any {
    const loggableConfiguration: LoggableConfiguration = getConfiguration(configuration);

    if (loggableConfiguration.consoleLoggingLevel === LoggingLevel.off) {
      return;
    }

    const loggableSingleton: LoggableSingleton = LoggableSingleton.instance;
    const prototype: any = constructor.prototype;

    for (const propertyName of Object.getOwnPropertyNames(prototype)) {
      const propertyDescriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(prototype, propertyName);

      if (!propertyDescriptor) {
        continue;
      }

      const originalFunction: any = propertyDescriptor.value;
      const isFunction: boolean = originalFunction instanceof Function;

      if (!isFunction) {
        continue;
      }

      propertyDescriptor.value = function (...args: any[]): any {
        loggableSingleton.pushLoggableMetadata(constructor.name, propertyName, loggableConfiguration);
        loggableSingleton.debug(formatString(loggableConfiguration.enteringText ?? ''));

        const enteringDate: number = Date.now();
        const result: any = originalFunction.apply(this, args);

        const exitFunction: () => void = (): void => {
          loggableSingleton.debug(formatString(loggableConfiguration.exitingText ?? '', {exitTime: Date.now() - enteringDate}));
        };

        if (typeof result === 'object' && typeof result.then === 'function') {
          const promise = result.then(exitFunction);

          if (typeof promise.catch === 'function') {
            promise.catch((e: any): any => e);
          }
        } else {
          exitFunction();
        }

        loggableSingleton.popLoggableMetadata();

        return result;
      };

      Object.defineProperty(prototype, propertyName, propertyDescriptor);
    }
  }

}
