# Pull de la imagen oficial que se utiliza como base
FROM node:14-alpine

# Creando el directorio para la aplicacion
WORKDIR /app

# Instalando las dependencias
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

# Empaquetando la aplicacion
COPY . .

# Configurando el puerto
EXPOSE 3000

# Iniciando la aplicacion
CMD ["yarn", "start"]