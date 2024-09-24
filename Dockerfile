FROM node:20

WORKDIR  /backend

COPY  package*.json ./

RUN npm install

RUN npm install -g ts-node

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "dev"]