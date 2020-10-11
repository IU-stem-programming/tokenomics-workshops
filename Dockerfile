FROM node:8

WORKDIR /app

COPY package.json .

RUN npm install --dev

COPY . .

CMD npm run dev
