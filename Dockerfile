FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN ls

RUN cd client

RUN npm install

run ls

run npm build

RUN cd ..

EXPOSE 3001

CMD npm run serve
