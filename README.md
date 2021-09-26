# @ngx-loggable/core [![npm version](https://badge.fury.io/js/%40ngx-loggable%2Fcore.svg)](https://badge.fury.io/js/%40ngx-loggable%2Fcore)

The logging library for Angular. With this library you can use a decorator to log all functions of a class.

Simple example using ngx-loggable: https://stackblitz.com/github/ngx-loggable/example

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)

## Installation

First you need to install the npm module:

```sh
npm install @ngx-loggable/core --save
```

## Usage

#### 1. Decorate the desired class with `@Loggable()`:

When you use the Loggable decorator without parameters, it uses the default configurations.

```ts
import {Component, OnInit} from '@angular/core';
import {Loggable} from '@ngx-loggable/core';

@Loggable()
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // ...
}
```

The default configuration is as follows:

```ts
  import {LoggableConfiguration, LoggingLevel} from '@ngx-loggable/core';

const defaultConfiguration: LoggableConfiguration = {
  consoleLoggingLevel: LoggingLevel.all,
  enteringText: 'Entering...',
  exitingText: 'Exiting ({exitTime}ms elapsed)...',
  prefixText: 'LOGGABLE-{loggingLevel} {padEnd:16}{className}@{methodName}: {padEnd:30}'
};
```

To specify your own configuration, you can pass the configuration as a parameter in the Loggable decorator like this:

```ts
import {Component, OnInit} from '@angular/core';
import {Loggable, LoggingLevel} from '@ngx-loggable/core';

@Loggable({
  consoleLoggingLevel: LoggingLevel.all,
  enteringText: 'Entering...',
  exitingText: 'Exiting ({exitTime}ms elapsed)...',
  prefixText: 'LOGGABLE-{loggingLevel} {padEnd:16}{className}@{methodName}: {padEnd:30}'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // ...
}
```

Even a better approach would be to store the configuration in a separate file and pass it as a constant:

```ts
  import {LoggableConfiguration, LoggingLevel} from '@ngx-loggable/core';

export const myConfiguration: LoggableConfiguration = {
  consoleLoggingLevel: LoggingLevel.all,
  enteringText: 'Entering...',
  exitingText: 'Exiting ({exitTime}ms elapsed)...',
  prefixText: 'LOGGABLE-{loggingLevel} {padEnd:16}{className}@{methodName}: {padEnd:30}'
};
```

```ts
import {Component, OnInit} from '@angular/core';
import {Loggable} from '@ngx-loggable/core';
import {myConfiguration} from './configurations/my-configuration'

@Loggable(myConfiguration)
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // ...
}
```

#### 2. Use `logger` to log messages:

When a class is decorated with `@Loggable()` you can use the `logger` constant to log messages:

```ts
import {Component, OnInit} from '@angular/core';
import {Loggable, logger} from '@ngx-loggable/core';
import {myConfiguration} from './configurations/my-configuration'

@Loggable(myConfiguration)
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public example(): void {
    logger.info('The example function was called!');
  }

}
```
