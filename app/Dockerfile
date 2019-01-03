FROM node:10.15-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN npm i
RUN npm i -g react-scripts@2.1.2

EXPOSE 3000
CMD [ "npm", "start" ]