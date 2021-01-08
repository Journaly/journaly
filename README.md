# Journaly

###### @ [journaly.com](http://journaly.com)

_A foreign-language journaling application where you can exchange feedback with native speakers._

---

Welcome to the Journaly repository!

The application is built with JavaScript/TypeScript on both the frontend and backend with a GraphQL API, leveraging powerful frameworks such as React, Next, and Apollo on the frontend and Prisma, Nexus, and Express on the backend, with a PostgreSQL database with Amazon RDS.

We use Python for data science, leveraging a number of powerful libraries for data aggregation and analysis, data visualization, and machine learning, such as NumPy, Pandas, Matplotlib, Seaborn, SciKit, and more.

## Architecture

The data model/DB schema lives in `j-db-client/prisma/schema`, server side code and some utils are in `nexus/`, and front end code constitutes most the rest of the directories. `graphql/` holds the _frontend_ graphql queries.

---

## Getting Started (in progress)

### Initial Setup

1. Clone the repository!
   ```sh
   $ git clone git@github.com:Journaly/journaly.git
   ```
1. Locate the `.env.example` file and copy the contents into a new `.env` file alongside it.
1. Run `npm ci`
1. Run `npm run prisma:generate`

#### Setting Up Your Local DB Instance

1. Install Postgres
- Mac/Linux users should use Homebrew
   _Note that this set your Postgres DB to run when your computer starts up and will stay running in the background_.

   ```bash
   $ brew install postgres
   $ brew services start postgresql
   ```

- Windows users should download and install Postgres from [postgresql.org](https://www.postgresql.org/download/windows/).

1. Start up your Postgres shell and create your user

   ```bash
   $ psql postgres
   $ create user <your_username> with createdb password '<your_password>';
   ```

1. Create your local instance of Journaly DB and give your user permissions

   ```bash
   $ create database journaly_db;
   $ alter user <your_username> with superuser;
   ```

2. Update your `.env` file with your new postgres username & password. Copy and paste your root `.env` into `j-db-client/prisma/.env`. You should end up with two of the same file, one in root and the other in `j-db-client`.

3. Finally, from the root of the project, apply database migrations to your new database instance:

   ```bash
   $ npm run migrate:up
   ```

   You've got a local Journaly PostgreSQL DB, woohoo! 🎉
   

#### Useful Commands For Working With Your DB

- Start up your psql `journaly_db` shell: `psql <your_db_url>`
- Wipe out the database, and reinsert the seed data: `npm run reseed-db`
- Update the generated GQL queries/mutations for use on the front end: `npm run codegen`

#### Database Migrations

Database migrations are how changes to the data model(`schema.prisma`) get applied to a database. Changes that you make to the data model in your local environment also need to be applied to databases in other environments, e.g. production, and migrations are how that change is reproduced elsewhere. If you edit the data model, you'll want to run the following commands from the root of the project:

```sh
$ npm run migrate:save
$ npm run migrate:up
$ npm i @journaly/j-db-client
```

The first command creates a migration, resulting in a new file in the `j-db-client/prisma/migrations` directory. The second applies that migration to the local database. Finally, re-installing the `@journaly/j-db-client` package results in an updated `PrismaClient`. You'll want to commit any new migration artifacts that you create. 

_Previous migrations should never be edited._

### Running Journaly

1. To run the entire app in local development mode, simply run `npm run dev` from the root of the project! 
1. Let's seed that baby DB! From the root of the repo, run `npm run reseed-db`

BOOM! You now have some users, along with a wee selection of posts :)

To marvel at the results, go to `http://localhost:3000/api/playground` and try the following query:

```gql
query feed {
  feed(Published: true) {
    Id
    Title
    Body
    Published
    author {
      Id
      Name
      Email
    }
  }
}
```

## More Helpful Docs

1. [Debugging Journaly With VS Code](./docs/debugging.md)
1. [Creating New Pages](./docs/0-creating-pages.md)
1. [Internationalization - i18n](./docs/1-internationalization.md)
1. [Event Tracking](./docs/2-event-tracking.md)
1. [Working With Images](./docs/3-working-with-images.md)
1. [E2E Tests](./docs/4-e2e-tests.md)

## Contributing To Journaly

If you'd like to become a contributor -- awesome!
Please read our [contributing guide](./docs/contributing-guide.md) to get started :)
