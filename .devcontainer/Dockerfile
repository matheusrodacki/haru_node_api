FROM node:23

# Alterne para o usuário root para instalar pacotes do sistema operacional
USER root

# Instale o cliente padrão do MySQL
RUN apt-get update && apt-get install -y mariadb-client

# Volte para o usuário node
USER node

# Defina as variáveis de ambiente
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# Defina o diretório de trabalho
WORKDIR /workspaces/micro_saas_nest_api

# Opcional: instale dependências globais aqui, se necessário
RUN npm install -g typescript @nestjs/cli