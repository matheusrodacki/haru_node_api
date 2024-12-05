# Etapa 1: Build
FROM node:23-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

RUN npm install --only=production

CMD ["npm", "run", "start:prod"]