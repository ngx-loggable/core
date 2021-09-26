import {Logger} from './lib/contracts/logger';
import {LoggableSingleton} from './lib/loggable-singleton';
import {LoggableDecorator} from './lib/contracts/loggable-decorator';
import {LoggableFactory} from './lib/loggable-factory';

export {LoggableFactory} from './lib/loggable-factory';
export {LoggableConfiguration} from './lib/contracts/loggable-configuration';
export {LoggingLevel} from './lib/enumerations/logging-level';

export const logger: Logger = LoggableSingleton.instance;
export const Loggable: LoggableDecorator = LoggableFactory.create();
