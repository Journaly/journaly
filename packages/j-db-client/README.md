# J-DB-Client

An internal database client that can be imported into any of the other Journaly services in order to perform database operations. It is published on NPM by the Journaly NPM organization and thus any changes need to be versioned and published (see steps below – access to the Journaly NPM account is required).

- This package is built with [Prisma](https://github.com/prisma/prisma), which generates type-safe database queries are mutations based on our data model (or schema) which lives in `prisma/schema.prisma`.
- When this package is installed within one of our services, a `PrismaClient` that contains all of these database operations is generated and can then be imported and used as needed.

## Updating the datamodel

If you need to update the data model, you'll need to follow these steps:

1. Make your change in `prisma/schema.prisma`.
1. Run `npm run migrate:save` and choose a descriptive name, such as `add-pending-notification-table` - this will generate a new directory within `./prisma/migrations` that contains the files for your migration.
1. Run `npm run migrate:up` to apply this migration to your local database instance.

## Migrations

Database migrations are how changes to the data model(`schema.prisma`) get applied to a database. Changes that you make to the data model in your local environment also need to be applied to databases in other environments, e.g. production, and migrations are how that change is reproduced elsewhere. If you edit the data model, you'll want to run the following commands:

**1. From the `packages/j-db-client` directory:**

```sh
$ npm run migrate:save
$ npm run migrate:up
```

**2. From the `packages/web` directory:**

```sh
$ npm i @journaly/j-db-client
```

The first command creates a migration, resulting in a new file in the `j-db-client/prisma/migrations` directory. The second applies that migration to the local database. Finally, re-installing the `@journaly/j-db-client` package in the `web` results in an updated `PrismaClient`. You'll want to commit any new migration artifacts that you create.

_Previous migrations should never be edited._

## Publishing Changes

1. Once you have made your changes to the schema and successfully generated your migration, be sure to apply that migration to your local DB to make sure there are no issues.
1. Bump the version of this package in `package.json`. Please follow [semver](https://semver.org/) and feel free to ask us if you have any doubts.
1. Run `npm run build`.
1. Run `npm publish` to publish this new version to the NPM registry.
