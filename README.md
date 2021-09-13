# The Scholar
Fake app that provides a interface for teachers to manage their classes and students. The main goal of this repository is to learn and explore Angular features.

## Data & Environment
First you will need a environment file following `api/.env.example`. Copy this one, name it `.env` and put your environment information there. The `TOKEN` property is a [JWK](https://jwt.io/) token.

This app implements a [JSON Server](https://github.com/typicode/json-server) API with a fake database provided by a JSON file (`api/db.json`, for instance). You can create your data there. Just create a JSON file with the following structure and point it in your `.env` file.

```
{
  "users": {},
  "archives": {},
  "courses": {},
  "students": {}
}
```
Please, read the guide under [JSON Server](https://github.com/typicode/json-server) GitHub page in order to know how to better manipulate the database file.

## Usage
**Note:** this guide assumes that you already have Node and NPM installed.

- **API:** navigate to `api/`, install its dependencies and run it:

```
npm install && npm start
```

- **Angular App:** first you will need Angular CLI installed at your machine. After that, navigate to `webapp/`, install its dependencies and run the Angular server:

```
npm install -g @angular/cli
```
```
npm install && ng serve
```
