FROM bitnami/node

LABEL maintainer="bettina.toth@gritacademy.se"

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm", "run", "start:prod" ]
