# Node MVC Example

Full features including e2e test, unit test and more

## Techs

- [Node](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Structure

```
.
├── README.md
├── babel.config.js
├── docker-compose.yaml
├── e2e
│   ├── dummy-data
│   ├── jest.config.json
│   ├── set-up
│   └── tests
├── nodemon.json
├── package.json
├── src
│   ├── constants
│   ├── controllers
│   ├── helpers
│   ├── index.ts
│   ├── middlewares
│   ├── models
│   ├── routes.ts
│   ├── server.ts
│   ├── services
│   └── types
│   └── views
├── tsconfig.json
└── yarn.lock
```

- `controllers`: codes for handling validation data
- `services`: codes for handling main logic
- `models`: codes mapping model in mongoDb and code
- `views`: codes for rendering views

## Set up development environment

First you need to install Docker to boost up local development environment

Then run to start local mongodb server

```bash
docker-compose up -d
```

Install project dependencies

```bash
yarn install
```

Start local development environment

```bash
yarn dev
```

Start in production mode

```
yarn start
```
