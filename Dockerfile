FROM node as build

WORKDIR /usr/src/app
COPY . .

WORKDIR /usr/src/app/packages/web
RUN npm ci
RUN npm run build

EXPOSE 3000