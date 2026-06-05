# @sirosfoundation/browser-log

[![npm version](https://img.shields.io/npm/v/@sirosfoundation/browser-log)](https://www.npmjs.com/package/@sirosfoundation/browser-log)
[![License: BSD-2-Clause](https://img.shields.io/badge/license-BSD--2--Clause-blue.svg)](./LICENSE)
[![Tests](https://github.com/sirosfoundation/browser-log/actions/workflows/test.yml/badge.svg)](https://github.com/sirosfoundation/browser-log/actions/workflows/test.yml)
[![Lint](https://github.com/sirosfoundation/browser-log/actions/workflows/lint.yml/badge.svg)](https://github.com/sirosfoundation/browser-log/actions/workflows/lint.yml)
[![Security](https://github.com/sirosfoundation/browser-log/actions/workflows/security.yml/badge.svg)](https://github.com/sirosfoundation/browser-log/actions/workflows/security.yml)
[![CodeQL](https://github.com/sirosfoundation/browser-log/actions/workflows/codeql.yml/badge.svg)](https://github.com/sirosfoundation/browser-log/actions/workflows/codeql.yml)

Pretty browser logs for browser-based TypeScript and JavaScript apps.

## Installation

```bash
pnpm add @sirosfoundation/browser-log
```

## Usage

### Basic logger

```ts
import { Logger } from '@sirosfoundation/browser-log';

const logger = new Logger();

logger.info('App started');
logger.warn('Cache miss');
logger.error('Something went wrong');
```

By default, the logger uses the `info` level, which means `error`, `warn`, and `info` messages are shown, while `debug` messages are hidden.

### Log levels

Supported levels:

- `error`
- `warn`
- `info`
- `debug`

```ts
import { Logger } from '@sirosfoundation/browser-log';

const logger = new Logger({ level: 'debug' });

logger.debug('Verbose details');
logger.info('Useful status');
```

> [!NOTE]   
> **Why no `log()` method?**   
> We've opted to not include a plain log method to encourage more intentional logging, thinking about *why* data is logged and what purpose it serves. When doing this, a non-specific `log` wasn't needed.


### Date prefix

You can include an ISO timestamp prefix in each message:

```ts
import { Logger } from '@sirosfoundation/browser-log';

const logger = new Logger({
  level: 'debug',
  prefix: 'date',
});

logger.info('Logger initialized');
```

### Change the log level at runtime

```ts
import { Logger } from '@sirosfoundation/browser-log';

const logger = new Logger({ level: 'info' });

logger.setLevel('debug');
logger.debug('Debug logging enabled');
```

### Grouped logs

The logger also supports grouped console output:

```ts
import { Logger } from '@sirosfoundation/browser-log';

const logger = new Logger({ level: 'debug' });

logger.group.info('Loading user profile');
logger.info('Fetching account');
logger.info('Fetching preferences');
logger.group.end();
```

## JSON formatting helper

The package also exports `jsonToLog`, which converts JSON-like values into readable plain text for logging.

```ts
import { jsonToLog } from '@sirosfoundation/browser-log';

const output = jsonToLog({
  user: 'Ada',
  roles: ['admin', 'editor'],
});

console.log(output);
```

## API

### `new Logger(options?)`

Options:

- `level?: 'error' | 'warn' | 'info' | 'debug'`
- `prefix?: 'date'`

### Instance methods

- `logger.error(...args)`
- `logger.warn(...args)`
- `logger.info(...args)`
- `logger.debug(...args)`
- `logger.setLevel(level)`

### Group methods

- `logger.group.error(...args)`
- `logger.group.warn(...args)`
- `logger.group.info(...args)`
- `logger.group.debug(...args)`
- `logger.group.end()`

### Utility exports

- `jsonToLog(value)`

## Development

```bash
pnpm install
pnpm build
pnpm test
```

## License

BSD-2-Clause