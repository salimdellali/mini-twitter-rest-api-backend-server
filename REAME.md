# Mini Twitter REST API Backend

## Project description

this project is an express server serving Mini Twitter REST API

## Getting started

- clone the repo
- run `npm install`
- run `cp .env.example .env`
- copy environment variables inside the `.env` file
- if doing development:
  - run `npm run start:dev`
  - if doing tests, run `npm run test:dev` to relaunch tests automatically after save
- if making it run on the production:
  - run `npm run build`
  - run `npm start`
- to launch tests one time:
  - run `npm run test`
- before commiting to the repo:
  - run `npm run prettier-format` to pretty the code
  - run `npm run lint` to look for ESLint warnings and errors

## Project structure

- `src/`:
  - `config/`: holds all the config files necessary to config the server
  - `docs/`: hold all the server documentations (swagger docs - basic system design diagrams - postman collection)
  - `exceptions/`: holds custom exceptions
  - `middlewares/`: holds the middlewares that intercepts requests and responses
  - `modules/`: core folder that holds the features this server provide
  - `shared/`: holds interfaces, functions ... etc that are shared accross the whole project
  - `validations/`: holds validations used to validate user inputs
  - `index.ts`: file that sets up & initializes the server, and glues everything together

## Steps taken to solve the challenge

- set up the project boilerplate
- implement user module
- meanwhile testing the endpoints using postman
- implement auth module
- implementing tests for user module (and realizing I kind of suck at tests ':-) )
- implement tweet module
- linting the project ( because I realized I had ESLint disabled until the end of the project ':-) )
- write swagger documentation
- draw basic system design diagrams
- write the readme

## Tech stack used

- Typescript
- Node.js
- Express.js
- MongoDB
- Mongoose
- Json Web Tokens
- Bcrypt
- Swagger
- VSCode
- Postman

## Lessons learned

- put eveything that I learned in one Node.js project
- using the RCSRM (Router - Controller - Service - Repository - Model) layered architecture
- intorduction to testing large applications
- writting Swagger documentation

## Last note

- It was really fun for me to solve this challenge, in my opinion, this coding test allowed me to craft the most beautiful Express server I could ever develop, As I could glue together in one project everything that I've learned about Node.js best practices, I've also learned quite a lot by the time of the development
- next step for me would be to learn more about tests, because I didn't get a proper chance to use tests before, I know tests are really important when it comes to build robust softwares.
- built with <3 and excitement by @salimdellali
