FROM node:20

WORKDIR /app

COPY package*.json ./

# Instala dependências do projeto
RUN yarn install --production

# Instala o Nest CLI globalmente
RUN yarn global add @nestjs/cli

# Copia o restante do código
COPY . .

# Compila o projeto
RUN yarn build

CMD ["node", "dist/main"]
