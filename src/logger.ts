export type LoggerLevel = 'error' | 'info' | 'warn' | 'debug';
export type LoggerPrefix = 'date';

export type LoggerOptions = {
	level?: LoggerLevel;
	prefix?: LoggerPrefix;
};

export class Logger {
	#level: LoggerLevel;
	#prefix: LoggerOptions['prefix'];
	// Severity ordering: error (0) > warn (1) > info (2) > debug (3)
	// Lower index = more severe, always enabled
	readonly logLevels: Array<LoggerLevel> = ['error', 'warn', 'info', 'debug'];

	readonly levelColors: Record<LoggerLevel, string> = {
		error: '#FF5C5C',
		info: '#4DA6FF',
		warn: '#FFAA00',
		debug: '#9E9E9E',
	};

	get level() {
		return this.#level;
	}

	constructor({ level, prefix }: LoggerOptions = {}) {
		this.#level = level || 'info';
		this.#prefix = prefix;

		this.bindMethods();
	}

	/**
	 * Bind console methods based on current log level.
	 * Methods with severity <= level are bound to console, others are no-ops.
	 */
	private bindMethods() {
		const levelIndex = this.logLevels.indexOf(this.#level);

		for (const [index, logLevel] of this.logLevels.entries()) {
			if (index <= levelIndex) {
				this.group[logLevel] = Function.prototype.bind.call(
					console.group,
					console,
					...this.logPrefix(logLevel),
				);

				this[logLevel] = Function.prototype.bind.call(
					console[logLevel],
					console,
					...this.logPrefix(logLevel),
				);
			} else {
				// Disable methods for levels below current threshold
				this.group[logLevel] = () => {};
				this[logLevel] = () => {};
			}
		}
	}

	/**
	 * Change log level at runtime. Intended for development/debugging only
	 * (e.g., window.logger.setLevel('debug')). Production log level should
	 * be set via tenant configuration (LOG_LEVEL env var).
	 */
	setLevel(logLevel: LoggerLevel) {
		this.#level = logLevel;
		this.bindMethods();
	}

	logPrefix(level: LoggerLevel) {
		let prefix = `%c[${level}]%c`;

		if (this.#prefix === 'date') {
			prefix += ` ${new Date().toISOString()} | `;
		}
		return [prefix, `color: ${this.levelColors[level]}; font-weight: bold;`, ''];
	}

	group: Record<LoggerLevel | 'end', (...args: unknown[]) => void> = {
		error: () => {},
		info: () => {},
		warn: () => {},
		debug: () => {},
		end() {
			console.groupEnd();
		},
	};

	error(..._args: unknown[]) {}
	info(..._args: unknown[]) {}
	warn(..._args: unknown[]) {}
	debug(..._args: unknown[]) {}
}

/**
 * Helper function that translates a json array or object into human
 * readable plain text for logger.
 */
export function jsonToLog(json: unknown): string {
	const indt = (i: number) => ' '.repeat(i);

	const parse = (input: unknown, indent: number = 2): string => {
		if (input === null || typeof input !== 'object') {
			return String(input).trim();
		}

		if (Array.isArray(input)) {
			return input.map((item) => `${indt(indent)}- ${parse(item, indent + 4)}`).join('\n');
		}

		return Object.entries(input as Record<string, unknown>)
			.map(([key, value]) => {
				if (Array.isArray(value)) {
					return (
						`${indt(indent)}${key}:\n` +
						value.map((item) => `${indt(indent + 4)}- ${parse(item, indent + 8)}`).join('\n')
					);
				}

				if (value && value instanceof Error) {
					return `${indt(indent)}${key}: ${value.message}`;
				}

				if (value && typeof value === 'object') {
					return `${indt(indent)}${key}:\n${parse(value, indent + 4)}`;
				}

				return `${indt(indent)}${key}: ${String(value).trim()}`;
			})
			.join('\n');
	};

	return `\n\n${parse(json)}\n\n`;
}
