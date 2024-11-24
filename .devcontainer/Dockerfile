FROM node:23

# Defina as variáveis de ambiente
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# Defina o diretório de trabalho
WORKDIR /workspaces/micro_saas_nest_api

# Opcional: instale dependências globais aqui, se necessário
RUN npm install -g pnpm @nestjs/cli typescript next