DOCKER_COMPOSE ?= docker-compose
DOCKER_RUN ?= ${DOCKER_COMPOSE} run --rm --service-ports
DOCKER_EXEC ?= ${DOCKER_COMPOSE} exec

# ------------------------
# Re-usable make targets
# ------------------------
up:
	${DOCKER_COMPOSE} up
.PHONY: up-all

down:
	${DOCKER_COMPOSE} down -v
.PHONY: down

# ------------------------
# Runnable make targets
# ------------------------
install:
	${DOCKER_RUN} dataminr yarn install
.PHONY: install

dev: down up
.PHONY: dev
