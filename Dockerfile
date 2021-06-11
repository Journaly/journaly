FROM node:14 as deps

USER node
WORKDIR /usr/src/app
COPY --chown=node packages ./

WORKDIR /usr/src/app/j-db-client
RUN npm ci

WORKDIR /usr/src/app/web
RUN npm ci
RUN npm run prisma:generate
RUN npm run build:nexus

ENV DATABASE_URL=postgres://developer:journaly@journaly_db:5432/journaly_db

EXPOSE 3000
