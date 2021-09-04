FROM node:12.16.1-alpine

ARG appTimezone

ENV DEFAULT_TZ ${appTimezone:-Europe/Madrid}

RUN apk update && apk upgrade && \
    apk add g++ make python

RUN apk add -U tzdata
RUN cp /usr/share/zoneinfo/${DEFAULT_TZ} /etc/localtime
RUN apk del tzdata

WORKDIR /usr/src/app

COPY package*.json ./

ENV NODE_MODULES_PATH /usr/src/app/node_modules
ENV PATH ${NODE_MODULES_PATH}/.bin:${PATH}

RUN npm install glob rimraf
RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "run", "build"]
