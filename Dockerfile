# Dockerfile
FROM node:alpine

WORKDIR /usr/app

COPY ./src .

RUN npm install

EXPOSE 8000

# Start
CMD [ "npm", "start" ]
