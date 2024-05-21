# Inventory Management Server

## Overview

This project is an Inventory Management Server built with Node JS, Express JS, Mongoose and MongoDB. It includes TypeScript for static type-checking and uses various development tools to ensure code quality and consistency.

**LIVE API Base URL:** [https://inventory-management-server-eta.vercel.app/](https://inventory-management-server-eta.vercel.app/)


## Table of Contents

- [Installation](#installation)
- [Running the Server](#running-the-server)
  - [Starting in Production Mode](#starting-in-production-mode)
  - [Starting in Development Mode](#starting-in-development-mode)
  - [Compiling TypeScript](#compiling-typescript)
- [Environment Variables](#environment-variables)

## Installation

To install the necessary dependencies, run the following command:

```bash
yarn
```

## Running the Server

### Starting in Production Mode

To start the server in production mode, run:

```bash
yarn start
```

This will execute the command `node ./dist/server.js`, which starts the server from the compiled JavaScript files in the `dist` directory.

### Starting in Development Mode

For development, it is recommended to use `nodemon` to automatically restart the server when file changes are detected. To start the server in development mode, run:

```bash
yarn start:dev
```

This will execute the command `nodemon ./dist/server.js`.

### Compiling TypeScript

To continuously compile TypeScript files into JavaScript, run:

```bash
yarn start:tsc
```

This will execute the command `tsc -w`, which watches for changes in TypeScript files and recompiles them automatically.

## Environment Variables

This project uses `dotenv` to manage environment variables. Create a `.env` file in the root directory of your project and add the necessary environment variables. For example:

```
DB_URI=mongodb://localhost:27017/inventory
PORT=5000
```

Ensure that you have a MongoDB instance running and update the `DB_URI` accordingly.


This guide should help you set up and run the Inventory Management Server. If you encounter any issues, please refer to the documentation of the respective packages or reach out for support. Happy coding!

