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

COPY --from=builder /app/package*.json ./

COPY --from=builder /app/src/scripts/run-client-migrations.ts ./src/scripts/run-client-migrations.ts

COPY --from=builder /app/src/client/**/*.entity{.ts,.js} ./src/client/

COPY --from=builder /app/src/database/migrations/client/*.ts ./src/database/migrations/client/

RUN npm install --only=production

CMD ["npm", "run", "start:prod"]