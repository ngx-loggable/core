export interface LoggableDecorator {

  new(...args: any[]): any;

  (): ClassDecorator;

}
