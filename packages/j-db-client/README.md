# J-DB-Client

An internal database client that can be imported into any of the other Journaly services in order to perform database operations. It is published on NPM by the Journaly NPM organization and thus any changes need to be versioned and published (see steps below – access to the Journaly NPM account is required).

- This package is built with [Prisma](https://github.com/prisma/prisma), which generates type-safe database queries are mutations based on our data model (or schema) which lives in `prisma/schema.prisma`.
- When this package is installed within one of our services, a `PrismaClient` that contains all of these database operations is generated and can then be imported and used as needed.

## Updating the datamodel

If you need to update the data model, you'll need to follow these steps:

1. Make your change in `prisma/schema.prisma`.
1. Run `npm run migrate:create` and choose a descriptive name, such as `add-pending-notification-table` - this will generate a new directory within `./prisma/migrations` that contains the files for your migration.
1. Run `npm run migrate:apply` to apply this migration to your local database instance.

## Migrations

Database migrations are how changes to the data model(`schema.prisma`) get applied to a database. Changes that you make to the data model in your local environment also need to be applied to databases in other environments, e.g. production, and migrations are how that change is reproduced elsewhere. If you edit the data model, you'll want to run the following commands:

**1. From the `packages/j-db-client` directory:**

```sh
$ npm run migrate:create
$ npm run migrate:apply
```

* The first command creates a migration, resulting in a new file in the `j-db-client/prisma/migrations` directory.
* The second applies that migration to the local database. This helps you to do an initial test on if there are any issues with the migration.

**2. Publish new `j-db-client` version**

In order to use fields from this migration in the `web` app/package, you need to publish a new version of `j-db-client` to the NPM registry so that it can be installed in our application's other packages (currently `web` and `j-mail`).

Steps:

1. Bump the version of this package in `package.json`. Please follow [semver](https://semver.org/) and feel free to ask us if you have any doubts.
1. Run `npm run build`.
1. Run `npm publish` to publish this new version to the NPM registry.

**3. From the `packages/web` directory:**

```sh
$ npm i @journaly/j-db-client
```

* This installs that latest version to your local web package and a post-install hook is run that regenerates your `PrismaClient`. If you have any problems with this, you can manually regenerate the `PrismaClient` by running `npm run prisma:generate`.
* You'll want to commit any new migration artifacts that you create.

**NOTE:**
_Previous migrations should never be edited._
