FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

ARG REACT_APP_URL_SERVER

ENV REACT_APP_URL_SERVER $URL_SERVER

RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]