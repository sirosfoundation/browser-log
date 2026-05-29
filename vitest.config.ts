import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.test.ts'],
		exclude: [
			'**/node_modules/**',
		],
		coverage: {
			provider: 'v8',
			include: ['src/**/*.ts'],
			exclude: ['src/**/*.test.ts'],
			reporter: ['text', 'lcov', 'html'],
			reportsDirectory: 'coverage',
		},
	},
});
