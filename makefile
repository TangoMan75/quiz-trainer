
# Run "make" to print help
# If you want to add a help message for your rule, just add : "## My help for this rule", on the previous line

.PHONY: help install run build tests lint deploy clean

# Colors
COLOR_TITLE   = \033[1;41m
COLOR_CAPTION = \033[1;44m
COLOR_LABEL   = \033[1;32m
COLOR_WARNING = \033[33m
COLOR_INFO    = \033[35m
COLOR_PRIMARY = \033[36m
COLOR_DEFAULT = \033[0m

# Date / Time
DATETIME=$(shell date '+%Y-%m-%d %H:%M:%S')

# get repository name from git
REPOSITORY=$(shell basename `git rev-parse --show-toplevel 2>/dev/null` 2>/dev/null)

## Print this help
help:
	@printf "${COLOR_TITLE} TangoMan $(shell basename ${CURDIR}) ${COLOR_DEFAULT}\n"
	@printf "${COLOR_PRIMARY}  date:${COLOR_DEFAULT}   ${COLOR_INFO}$(shell date '+%Y-%m-%d %H:%M:%S')${COLOR_DEFAULT}\n"
	@printf "${COLOR_PRIMARY}  login:${COLOR_DEFAULT}  ${COLOR_INFO}$(shell whoami)${COLOR_DEFAULT}\n"
	@printf "${COLOR_PRIMARY}  system:${COLOR_DEFAULT} ${COLOR_INFO}$(shell uname -s)${COLOR_DEFAULT}\n\n"

	@printf "${COLOR_CAPTION} description:${COLOR_DEFAULT}\n"
	@printf "${COLOR_WARNING}  manage Vue.js project${COLOR_DEFAULT}\n\n"

	@printf "${COLOR_CAPTION} Usage:${COLOR_DEFAULT}\n"
	@printf "${COLOR_WARNING}  make [command]${COLOR_DEFAULT}\n\n"

	@printf "${COLOR_CAPTION} Available commands:${COLOR_DEFAULT}\n"
	@awk '/^[a-zA-Z\-\_0-9\@]+:/ { \
		HELP_LINE = match(LAST_LINE, /^## (.*)/); \
		HELP_COMMAND = substr($$1, 0, index($$1, ":")); \
		HELP_MESSAGE = substr(LAST_LINE, RSTART + 3, RLENGTH); \
		printf "  ${COLOR_LABEL}%-18s${COLOR_DEFAULT} ${COLOR_PRIMARY}%s${COLOR_DEFAULT}\n", HELP_COMMAND, HELP_MESSAGE; \
	} \
	{ LAST_LINE = $$0 }' ${MAKEFILE_LIST}

####################################
### Vue
####################################

## Install dependencies
install:
	@if [ ! -d node_modules ] && [ -f yarn.lock ]; then yarn install; elif [ ! -d node_modules ]; then npm install; fi

## Serve with hot reload at localhost:8080
run:
	@xdg-open http://localhost:8080
	@if [ -f yarn.lock ]; then yarn serve; else npm run serve; fi

## Build for production with minification
build:
	@rm -rf ./dist
	@if [ -f yarn.lock ]; then yarn build; else npm run build; fi

## Run unit tests
tests:
	@if [ -f yarn.lock ]; then yarn run test:unit; else npm run test:unit; fi

## Lint and fix files
lint:
	@if [ -f yarn.lock ]; then yarn run lint; else npm run lint; fi

## Deploy to gh-pages
deploy: build
	@(cd dist; git init; git add -A; git commit -m "${DATETIME}"; git push -f git@github.com:TangoMan75/${REPOSITORY}.git master:gh-pages; cd -)

## Uninstall app
clean:
	@rm -rf node_modules
	@rm -rf dist
