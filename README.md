# FindWay

> This project is intended to work as a full-stack app for planning BART Trip

## Technology stack

> A full stack app built with React, Node/Express, MySQl

- CSS
- HTML5
- React.js
- Node.js
- Express
- MySQL

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node v8.10.0
- npm v3.5.2
- Mysql(5.7)

### Installing Dependencies

From within the root directory:

```sh
npm install
```

## Development

From within the root directory:

In database/config.js use your mysql username and password

To seed database
mysql -u <USER> -p < schema.sql

To run server

```sh
npm start
```

To run dev enviroment/webpack

```sh
npm run dev:react
```

Additional work:
I would love to build more on this website as follows:

1. Finding a Route Between Stations:
   As a rider planning a trip, when I choose an origin and destination station, I want to see a set of directions that take me from my origin to my destination.
2. Choosing Multiple Routes:
   As a rider, when more than one route is available, I want to choose the route I like best.
   3)Estimating Trip Duration
   As a rider on my way to a party, I want to see the how long a trip is expected to take so I can tell my friends when to expect me.
