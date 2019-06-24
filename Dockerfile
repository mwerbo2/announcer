FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN ls

RUN cd client

RUN npm install

run npm run build

RUN cd ..

EXPOSE 3001

CMD npm run serve
