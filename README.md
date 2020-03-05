# JWT Token Auth Server

A simple example of an authentication server that hands out API tokens to use. You can use this server as a simple example of how a microservice architecture might look like to authenticate users to use other services.

## Motivation

I was just starting to learn how microservices worked, the motivation behind them, and a functional example of one. Furthermore, I wanted to get into learning Javascript / Node.js on my own so I thought this might be a great and quick project to learn some concepts.

## Requirements

### Prerequirements

You must have node and npm installed already on your machine and mongoDB.
Alternatively you can also run this application using Docker.

Additionally, add a .env file to the src directory with the content to sign your jwt keys with

```
TOKEN_SECRET=<Some_Secret>
```

### Step 1

Before running the application be sure to have mongo runing in the background. I personally use the command

```bash
mongod --config /usr/local/etc/mongod.conf --fork
```

(which points to my local config of mongod, your command may be different)

### Step 2 [Option 1]

Navigate to the src directory of this project, and run

```bash
npm install
npm start
```

### Step 2 [Option 2]

Or, you could use Docker and run the project from the docker file.
Navigate to the root directory of this project and run
(although you must have mongo running)

```bash
docker image build
docker container run --publish 8000:8000 --detach
```

## Usage

The application is listening for traffic on port 8000 and you can :

POST to localhost:8000/api/user/register with this set as your payload:

```json
{
  "name": "Bob Jones",
  "email": "Bobby@yahoo.com",
  "password": "123456"
}
```

which will save your credentials on the database (using bcrpyt and salting the passwords) and respond with your document id.

POST to localhost:8000/api/user/login with the same email and password:

```json
{
  "email": "Bobby@yahoo.com",
  "password": "123456"
}
```

and you should get a response which looks like:

```javascript
{
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTYwMmE1YjE2MWRhZDkxNTViZjhhN2IiLCJpYXQiOjE1ODMzNjA5ODEsImV4cCI6MTU4MzM2ODE4MX0.rhzijx7VamftLKx4K_S85yRrmtDhQ9mP-5xtGjthjjA
}
```

Now you can access the "protected resources" on the route localhost:8000/protected/private with the Authorization header set to Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTYwMmE1YjE2MWRhZDkxNTViZjhhN2IiLCJpYXQiOjE1ODMzNjA5ODEsImV4cCI6MTU4MzM2ODE4MX0.rhzijx7VamftLKx4K_S85yRrmtDhQ9mP-5xtGjthjjA which will respond with your decoded jwt token.

```javascript
{
    "_id": "5e602a5b161dad9155bf8a7b",
    "iat": 1583366662,
    "exp": 1583373862
}
```
