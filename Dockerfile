FROM node

ENV TZ=America/Chicago

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN ls

RUN cd client

RUN npm install

RUN ls

RUN cd ..

EXPOSE 3001

CMD npm run serve
