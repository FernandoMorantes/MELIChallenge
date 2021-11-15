# Pull de la imagen oficial que se utiliza como base
FROM node:16

# Creando el directorio para la aplicacion
WORKDIR /usr/src/app

# Instalando las dependencias
# El wildcard es utilizado para asegurar que tanto el package.json y el package-lock.json son copiados
COPY package*.json ./

RUN npm install

# Empaquetando la aplicacion
COPY . .

# Configurando el puerto
EXPOSE 8080

# Iniciando la aplicacion
CMD [ "node", "index.js" ]