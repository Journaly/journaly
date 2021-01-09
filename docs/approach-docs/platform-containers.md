# A Containerized Approach Using Docker and Compose - Approach Doc

I would like to propose the adoption of docker and docker-compose to begin containerizing the Journaly stack, starting with the database, paving the way for other servers or services that require installing software on a local development machine.

## Details

Installing postgres directly on a development machine might not be possible for some, and requires a level of support and maintenance on their part. With a containerized approach, we can eliminate this hurdle and perhaps shorten the time it takes for new developers to get setup. 

Additionally, we could have a more consistent database environment for all developers, for instance, setting up users and other related artifacts during the containerization process.

When I first setup Journaly, I used docker for my DB, and with the following changes, had it up and running in little time.

### Docker

We need a root level `Dockerfile` that looks something like this:

```docker
FROM postgres:11

EXPOSE 5432

COPY bootstrap.sh /docker-entrypoint-initdb.d/db-bootstrap.sh
```

You'll see that I have a bootstrap shell script to set up some initial database work:

```sh
#!/bin/bash

set -e # bail immediately on error

psql <<- EOSQL
    CREATE USER developer WITH CREATEDB PASSWORD 'nights_watch';
    CREATE DATABASE journaly_db;
EOSQL

echo "Database bootstrap complete."
```

There's a lot of potential here to automate environment and database settings.

### Docker-Compose

Finally, we need a `docker-compose.yml` file to tie it all together:

```yaml
version: '3'

services:
  journaly:
    image: 'journaly:latest'
    ports:
      - '5432:5432'
    volumes:
      - journaly_db:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: <db_password>
    build: .

volumes:
  journaly_db:

```

### Final Modifications

With the given files, we end up with the following additions:

- `db-bootstrap.sh`
- `Dockerfile`
- `docker-compose.yaml`

We can then use compose with the following commands to build and run the image and container:

```bash
$ docker-compose build
$ docker-compose up
```

Nothing else changes for the setup instructions, the database is still exposed on the default postgres port `5432` and the database seed can run directly against the container.

## Concerns

### Docker Knowledge

I found docker difficult to grasp when it came out and still struggle with advanced concepts. We'd be asking our developers to have some level of understanding of docker to work with our stack. If they don't have docker at all, it would require an install of additional software.

At this point, it would be optional, and an alternative to installing postgres.

### Permissions

You'll notice that the `docker-compose.yml` file has a line for the postgres setting `POSTGRES_PASSWORD`. This is required for postgres to run, which means yet another password for the developer to setup. The alternative is to set postgres to run completely insecure, not a great option even though it's for local development.

Also, the npm script that runs for `reseed` deletes tables, and for some reason, it doesn't have permissions with this setup. I would need to research the problem further, however, now that we're in a container, we could simply re-build the image, eliminating the raw SQL in the package.json file.

### Data

This solution doesn't yet concern itself with development data. Rebuilding an image means the developer lost all data and starts over. This is an unknown concern here.
