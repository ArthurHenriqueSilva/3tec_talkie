# Utiliza a imagem do Node.js como base
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install --production

# Copia os arquivos restantes do frontend
COPY . .

# Cria a build do Next.js
RUN npm run build

# Expõe a porta que o Next.js usará
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]
