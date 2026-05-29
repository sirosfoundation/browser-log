import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: ['src/logger.ts'],
	format: ['esm', 'cjs'],
	dts: true,
	clean: true,
	sourcemap: true,
});
