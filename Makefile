#/**
# * TangoMan Quiz Trainer
# *
# * TangoMan Makefile Generator: Run `make` to print help.
# * If you want to add a help message for your rule, just add : "## Foo bar", on the previous line.
# * Use : "### Foobar" to group rules by categories.
# * You can pass arguments with this syntax: `make COMMAND PARAMETER=VALUE`.
# *
# * @version  0.1.0
# * @author   "Matthias Morin" <mat@tangoman.io>
# * @licence  MIT
# * @link     https://github.com/TangoMan75/quiz-trainer
# */

.PHONY: help install run build tests lint deploy clean dev-install

#--------------------------------------------------
# Colors
#--------------------------------------------------

TITLE     = \033[33m
PRIMARY   = \033[97m
SECONDARY = \033[96m
SUCCESS   = \033[92m
DANGER    = \033[31m
WARNING   = \033[93m
INFO      = \033[95m
LIGHT     = \033[47;90m
DARK      = \033[40;37m
MUTED     = \033[37m
PROMPT    = \033[96m
LABEL     = \033[32m
ERROR     = \033[1;31
DEFAULT   = \033[0m
NL        = \033[0m\n

#--------------------------------------------------
# System
#--------------------------------------------------

# Local operating system (Windows_NT, Darwin, Linux)
ifeq ($(OS),Windows_NT)
	SYSTEM=$(OS)
else
	SYSTEM=$(shell uname -s)
endif

#--------------------------------------------------
# Help
#--------------------------------------------------

## Print this help
help:
	@printf "${LIGHT} TangoMan Quiz Trainer ${NL}\n"

	@printf "${TITLE}Description:${NL}"
	@printf "${PRIMARY}  manage Vue.js project${NL}\n"

	@printf "${TITLE}Usage:${NL}"
	@printf "${PRIMARY}  make [command]${NL}\n"

	@printf "${TITLE}Commands:${NL}"
	@awk '/^### /{printf"\n${TITLE}%s${NL}",substr($$0,5)} \
	/^[a-zA-Z0-9_-]+:/{HELP="";if(match(PREV,/^## /))HELP=substr(PREV, 4); \
		printf "  ${LABEL}%-12s${DEFAULT} ${PRIMARY}%s${NL}",substr($$1,0,index($$1,":")),HELP \
	}{PREV=$$0}' ${MAKEFILE_LIST}

##################################################
### Vue
##################################################

## Install dependencies
install:
	@if [ ! -d node_modules ] && [ -f yarn.lock ]; then \
		printf "${INFO}yarn install${NL}"; \
		yarn install; \
	elif [ ! -d node_modules ]; then \
		printf "${INFO}npm install${NL}"; \
		npm install; \
	fi

## Serve with hot reload at localhost:8080
serve:
	@printf "${INFO}xdg-open http://localhost:8080${NL}"
	@xdg-open http://localhost:8080
	@if [ -f yarn.lock ]; then \
		printf "${INFO}yarn serve${NL}"; \
		yarn serve; \
	else \
		printf "${INFO}npm run serve${NL}"; \
		npm run serve; \
	fi

## Build for production with minification
build:
	@printf "${INFO}rm -rf ./dist${NL}"
	@rm -rf ./dist
	@if [ -f yarn.lock ]; then \
		printf "${INFO}yarn build${NL}"; \
		yarn build; \
	else \
		printf "${INFO}npm run build${NL}"; \
		npm run build; \
	fi

## Run unit tests
tests:
	@if [ -f yarn.lock ]; then \
		printf "${INFO}yarn run test:unit${NL}"; \
		yarn run test:unit; \
	else \
		printf "${INFO}npm run test:unit${NL}"; \
		npm run test:unit; \
	fi

## Lint and fix files
lint:
	@if [ -f yarn.lock ]; then \
		printf "${INFO}yarn run lint${NL}"; \
		yarn run lint; \
	else \
		printf "${INFO}npm run lint${NL}"; \
		npm run lint; \
	fi

## Deploy to gh-pages
deploy: build
	@( \
		printf "${INFO}cd dist${NL}"; \
		cd dist; \
		printf "${INFO}git init${NL}"; \
		git init; \
		printf "${INFO}git add -A${NL}"; \
		git add -A; \
		printf "${INFO}git commit -m "$(shell date '+%Y-%m-%d %H:%M:%S')"${NL}"; \
		git commit -m "$(shell date '+%Y-%m-%d %H:%M:%S')"; \
		printf "${INFO}git push -f git@github.com:TangoMan75/quiz-trainer.git master:gh-pages${NL}"; \
		git push -f git@github.com:TangoMan75/quiz-trainer.git master:gh-pages; \
	)

## Uninstall app
clean:
	@printf "${INFO}rm -rf node_modules${NL}"
	@rm -rf node_modules
	@printf "${INFO}rm -rf dist${NL}"
	@rm -rf dist

## Install development environment (yarn, vue-cli)
dev-install:
ifeq (${OS}, Linux)
	@printf "${INFO}curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -${NL}"
	@curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
	@printf "${INFO}echo 'deb https://dl.yarnpkg.com/debian/ stable main' | sudo tee /etc/apt/sources.list.d/yarn.list${NL}"
	@echo 'deb https://dl.yarnpkg.com/debian/ stable main' | sudo tee /etc/apt/sources.list.d/yarn.list
	@printf "${INFO}sudo apt-get update${NL}"
	@sudo apt-get update
	@printf "${INFO}sudo apt-get install -y yarn${NL}"
	@sudo apt-get install -y yarn
	@printf "${INFO}sudo yarn global add @vue/cli${NL}"
	@sudo yarn global add @vue/cli
endif

