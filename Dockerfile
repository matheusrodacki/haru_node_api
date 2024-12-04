# Etapa 1: Build
FROM node:23 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Etapa 2: Produção
FROM node:23-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/package*.json ./

RUN npm install --only=production

CMD ["node", "dist/src/main.js"]