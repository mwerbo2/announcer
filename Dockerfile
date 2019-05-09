FROM node:10

RUN mkdir /app

RUN cp . ./app

WORKDIR /app

RUN npm install

RUN cd /client

RUN npm install

RUN CD ..

EXPOSE 3001

CMD npm run serve