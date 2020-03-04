# JWT Token Auth Server
A simple example of an authentication server that hands out API tokens to use. You can use this server as a simple example of how a microservice architecture might look like to authenticate users to use other services.

## Motivation
I was just starting to learn how microservices worked, the motivation behind them, and a functional example of one. Furthermore, I wanted to get into learning Javascript / Node.js on my own so I thought this might be a great and quick project to learn some concepts.

## Requirements

You must have node and npm installed already on your machine, or alternatively have Docker installed.

Navigate to the src directory of this project, and run 
```bash
npm install
npm start
```

Or, you could use Docker and run the project from the docker file.
Navigate to the root directory of this project and run
```bash
docker image build
docker container run --publish 8000:8000 --detach
```


## Usage

