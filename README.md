# JWT Token Auth Server
A simple example of an authentication server that hands out API tokens to use. You can use this server as a simple example of how a microservice architecture might look like to authenticate users to use other services.

## Motivation
I was just starting to learn how microservices worked, the motivation behind them, and a functional example of one. Furthermore, I wanted to get into learning Javascript / Node.js on my own so I thought this might be a great and quick project to learn some concepts.

## Requirements

You must have node and npm installed already on your machine and mongoDB.
Alternatively you can also run this application using Docker.

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
```javascript
{
    name: "Bob Jones",
    email: "Bobby@yahoo.com",
    password: "123456"
}
```
which will save your credentials on the database (using bcrpyt and salting the passwords)

POST to localhost:8000/api/user/login with the same body and you should get a response which looks like:
```javascript
{
    jwt: "2317y85ghjkabfyu81bjkb889"
}
```

Now you can access the "protected resources" on the route localhost:8000/protected/private which will respond with your user_id from the database
```javascript
{
    user: "12341adsfdas589y41842710jwe481720941"
}
```