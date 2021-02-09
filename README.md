# Journaly

###### @ [journaly.com](http://journaly.com)

Welcome to the Journaly repository!

_A foreign language journaling platform for exchanging feedback with native or advanced speakers and building community around shared interests and languages._

## Why?

**We believe that WRITING is perhaps the most undervalued and under-utilized activities for improving foreign language skills.**
Some major reasons for this are:

- Writing is relatively _effortful_ and practicing it consistently requires building a habit around it.
- It is hard to find people to give you feedback.
- Even once finding someone, figuring out how best to give someone feedback isn't obvious and takes a lot of effort.
- Once you get feedback from soneone, it isn't easy to actually apply, store, organize, and keep track of it over time.

**Journaly is about striving to build excellent software with beautiful, simple, and intuitive User Interface & User Experience Design that solves each of the above problems for our users:**

- We make the writing experience delightful, enjoyable, and easy to engage in; helping users build healthful and sustainable writing habits.
- We make it incredibly straightfoward to find people to provide users feedback. In fact, users just have to write and the community finds THEM.
- We build intuitive tools that make it incredibly easy to sweep through someone's post and give them feedback exactly where it belongs.
- Feedback stays neatly organized and is easy to digest and find again later.

## Architecture

Journaly consists of multiple independent services/packages that are all deployed separately.
We manage the deployment of these services with our own Cloud Infrastructure in Amazon Web Services (AWS).

Here is an overview of the project setup:

```
|-- journaly/
|---- docs/
|---- cypress/
|---- packages/
|------ web/ # Our core application that users engage with on the web
|------ j-mail/ # A simple managed queue service for handling transactional emails from within the app
|------ j-db-client/ # A database client that can be imported into any service to interact with the db
|-------- schema.prisma # our database schema
|-------- migrations/
```

More detailed documentation can be found within each directory (WIP).

## Getting Started (in progress)

### Initial Setup

1. Clone the repository!
   ```sh
   $ git clone git@github.com:Journaly/journaly.git
   ```
1. Locate the `.env.example` file and copy the contents into a new `.env` file alongside it.
1. Navigate to `packages/web`
1. Run `npm ci`

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

1. Update your `.env` file with your new postgres username & password. Copy and paste your root `.env` into `j-db-client/prisma/.env`. You should end up with two of the same file, one in root and the other in `j-db-client`.

1. Finally, from the `packages/j-db-client` directory, apply database migrations to your new database instance:

   ```bash
   $ npm run migrate:up
   ```

   You've got a local Journaly PostgreSQL DB, woohoo! 🎉

#### Useful Commands For Working With Your DB

**NOTE: All DB commands/scripts are run from within the `packages/j-db-client` directory. Detailed documentation can be found [here](./packages/j-db-client)**

- Start up your psql `journaly_db` shell: `psql <your_db_url>`
- Wipe out the database, and reinsert the seed data: `npm run reseed-db`
- Update the generated GQL queries/mutations for use on the front end: `npm run codegen`

### Running Journaly

1. To run the entire app in local development mode, simply run `npm run dev` from the root of the project!
1. Let's seed that baby DB! From the root of the repo, run `npm run reseed-db`

BOOM! You now have some users, along with a wee selection of posts :)

**NOTE: the playground is currently not working, we are working on fixing this. This doesn't impact your ability to work on the project**

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
