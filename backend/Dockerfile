FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

RUN npm i aws-sdk

COPY . .

EXPOSE 5000

CMD [ "node", "server.js" ]