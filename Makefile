# ==============================================================================
# Development
# ==============================================================================

.PHONY: dev
dev:
	pnpm dev

# ==============================================================================
# Production
# ==============================================================================

.PHONY: build
build:
	pnpm build

# ==============================================================================
# Versioning & Changesets
# ==============================================================================

.PHONY: changeset
changeset:
	@pnpm changeset add

.PHONY: version
version:
	@pnpm dotenv -e .changeset/.env -- changeset version

.PHONY: tag
tag:
	@pnpm changeset tag

.PHONY: prerelease-mode
prerelease-mode:
	@pnpm changeset pre $(filter-out $@,$(MAKECMDGOALS))

# ==============================================================================
# Linting
# ==============================================================================

.PHONY: lint
lint:
	pnpm biome check src/

.PHONY: lint-fix
lint-fix:
	pnpm biome check --write src/

# ==============================================================================
# Testing
# ==============================================================================

.PHONY: test-unit
test-unit:
	pnpm test:unit
