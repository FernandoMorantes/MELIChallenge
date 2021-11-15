# pull official base image
FROM node:14-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

# add app
COPY . .

# configure port
EXPOSE 3000

# start app
CMD ["yarn", "start"]