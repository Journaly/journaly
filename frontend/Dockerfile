# Stage 1 - Set up our base Node Environment
FROM node:10.15-alpine as base-node

# Expose port the app expects
EXPOSE 3000

# Install dependencies that certain node_modules need
# not included in the Alpine distribution
RUN apk add --no-cache curl make gcc g++ python

# Create working directory for the Docker builds
WORKDIR /usr/src/app
# Set permissions to limited permission/node user
RUN chown node:node .

# Switch to node user
USER node

# Copy package.json and package-lock.json
# with appropriate permissions for node user
COPY package*.json ./

ENV NODE_ENV=production
# Print out Node config info for debugging purposes
RUN npm config list \
  # Install production-only dependencies
  && npm ci \
  # Be sure to clean up the NPM cache
  && npm cache clean --force

# Stage 2 - set up development node environment
# We don't COPY in this stage because we are bind-mounting in development,
# this saves time when building locally
FROM base-node as dev-node

# Set PATH to be the container's /node_modules/.bin directory
ENV PATH /usr/src/app/node_modules/.bin/:$PATH

# Install only devDependencies
ENV NODE_ENV=development
RUN npm install --only=development

# Stage 3 - testing
# This stage is for the purpose of being run in C.I.
# If tests fail this build will fail and stop the deployment
FROM dev-node as test
# Copy over source code with appropriate permissions for node user
COPY --chown=node:node . .

# run linters & a package audit as part of build
#RUN eslint .
#RUN npm audit

# run unit tests as part of build
CMD ["npm", "test"]

# Stage 4 - default, production
# This will run by default if you don't include a target
# It has production-only dependencies.
FROM base-node as release

# Set this with shell variables at build-time.
# If they aren't set, then not-set will be default
ARG CREATED_DATE=not-set
ARG SOURCE_COMMIT=not-set

# Set metadata for the image that gets pushed to the registry
LABEL org.opencontainers.image.authors=robin@journaly.com
LABEL org.opencontainers.image.created=${CREATED_DATE}
LABEL org.opencontainers.image.revision=${SOURCE_COMMIT}
LABEL org.opencontainers.image.title="The frontend image of journaly.com"
LABEL org.opencontainers.image.url=https://hub.docker.com/repository/docker/journaly/frontend
LABEL org.opencontainers.image.source=https://https://github.com/Journaly/journaly
LABEL org.opencontainers.image.licenses=MIT
LABEL com.journaly.nodeversion=${NODE_VERSION}

# Copy over source code with appropriate permissions for node user.
COPY --chown=node:node . .

RUN npm run build

# Run a basic health check to ensure things are up
HEALTHCHECK CMD curl http://127.0.0.1/ || exit 1

# Finally, spin up the app
CMD ["npm", "run", "start"]
