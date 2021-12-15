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
ENV NODE_ENV='development'
ENV APP_ENV='dev'
ENV APP_SECRET='journaly'
ENV SITE_DOMAIN='localhost:3000'
ENV DEPLOYMENT_URL='localhost:3000'
ENV MAIL_HOST='<mail-host>'
ENV MAIL_PORT='<port>'
ENV MAIL_USER='<mail-user>'
ENV MAIL_PASSWORD="<thats-a-secret>"
ENV MAIL_SECURE='false'
ENV NEXT_PUBLIC_STRIPE_PUBLIC_KEY='iLoveMonayyy'
ENV STRIPE_SECRET_KEY='iLoveMonayyy'
ENV STRIPE_WEBHOOK_SIGNING_SECRET='iLoveMonayyy'
ENV STRIPE_MONTHLY_PRICE_ID='iLoveMonayyy'
ENV STRIPE_ANNUAL_PRICE_ID='iLoveMonayyy'
ENV STRIPE_STUDENT_ANNUAL_PRICE_ID='iLoveMonayyy'

EXPOSE 3000
