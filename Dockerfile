FROM node:20-alpine as development

WORKDIR /app

COPY ./package.json ./package.json

RUN npm install

COPY . .
