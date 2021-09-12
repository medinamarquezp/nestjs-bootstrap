<p align="left">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="180" alt="Nest Logo" /></a>
</p>

# NestJS bootstrap template

## Description

A template of [NestJS](https://github.com/nestjs/nest) framework with some base configurations and utilities like:

-   Docker file and docker compose for app and MySQL database
-   TypeORM and database configuration
-   Factories and migrations
-   Auth with JWT
-   Users CRUD
-   Swagger docs
-   Utilities for E2E and unit testing
-   Some shared utilities
-   CORS and Helmet
-   Rate limit
-   Husky executing linting, format and tests on pre-push
-   Git commit message linter

The purpose of this repository is to have in a base NestJS project all the boilerplate and configurations required to prevent starting every REST API project from scratch. The main idea is to mantain all dependecies up to date and to add all those shared functionalities required in my future projects.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit and e2e tests
$ npm run test

# test coverage
$ npm run test:cov
```
