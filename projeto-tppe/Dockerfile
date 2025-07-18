FROM node:20

WORKDIR /app

COPY package*.json ./
RUN yarn install --production

COPY . .

RUN yarn build

CMD ["node", "dist/main"]
