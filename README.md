# CODIFIN | STRYKE DEV TEST PROJECT

This project is presented by Rafael Gomez Sanchez, to apply for a position with Stryke Dev Team via Codifin

## Solution's Structure
The project is created on NodeJS using Typescript and Express. The DBMS selected was PostgreSQL.

## Installation
The selected DBMS is PostgreSQL. First, create the neccessary tables by running the file TableCreation.sql in src > sql. For this, one needs to first open the psql shell to run a command, which is the following. The absolute path depends on where the project is located.

```bash
\i 'C:/Users/UserName/Documents/StrykeDev/TechnicalTestProject/src/sql/TableCreation.sql'
```
After this, we need to install all the dependencias with:

```bash
npm install
```

Once evertyhing is set, in order to test it there are three npm custome scripts added:

```bash
npm run build
npm run remove-dist
npm run rebuild
```

The first is when we run the project for the first time. This will compile the TypeScript files and generate its environment variables into the dist folder (where the compiled files are). Once the command is executed, we can start consuming the API

In case an error occurs, we should either delete the dist folder by typing the second command and then the first again; or just running the third command which will restart the project successfully!

To run the test coverage command, we should run the following npm script

```bash
npm run test
npm run test-coverage
```

The unit testing code is tested using Jest

## Swagger
Swagger can be written in JSON or YAML. In this guide, we only use YAML examples, but JSON works equally well. A sample Swagger specification written in YAML looks like:

```yaml
swagger: "2.0"
info:
  title: CODIFIN TEST API
  description: Project Test using NodeJS and TypeScript
  version: 1.0.0
host: localhost:3000
schemes:
  - http
paths:
  /client_credentials:
    post:
      summary: Generates an access token
      produces:
        - application/json
      responses:
        200:
          description: OK
        401:
          description: Unauthorized
  /register:
    post:
      summary: Registers a user
      produces:
        - application/json
      responses:
        200:
          description: OK
        401:
          description: Unauthorized
  /login:
    post:
      summary: Register user logs in and obtains a user token
      produces:
        - application/json
      responses:
        200:
          description: OK
        401:
          description: Unauthorized
  /extract/posts:
    get:
      summary: Extracts posts from external api into the database
      produces:
        - application/json
      responses:
        200:
          description: OK
        401:
          description: Unauthorized
  /extract/comments:
    get:
      summary: Extracts comments from external api into the database
      produces:
        - application/json
      responses:
        200:
          description: OK
        401:
          description: Unauthorized
  /posts:
    get:
      summary: Obtains posts from the database
      produces:
        - application/json
      responses:
        200:
          description: OK
        401:
          description: Unauthorized
  /posts:
    get:
      summary: Obtains comments from the database
      produces:
        - application/json
      responses:
        200:
          description: OK
        401:
          description: Unauthorized
```