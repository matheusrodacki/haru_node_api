# Etapa 1: Build
FROM node:23-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY . .

# Instala as dependências do projeto
RUN npm install

# Compila o projeto
RUN npm run build

# Define o comando padrão
CMD ["npm", "run", "start:prod"]