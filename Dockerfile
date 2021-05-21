FROM node:14 as deps

USER node
WORKDIR /usr/src/app
COPY packages/web/package* ./
RUN npm ci
RUN npm run prisma:generate

FROM deps as build
USER node
COPY --chown=node packages/web/ ./

RUN npm run build:nexus

ENV DATABASE_URL=postgres://developer:journaly@journaly_db:5432/journaly_db

EXPOSE 3000
