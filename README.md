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
- Once you get feedback from someone, it isn't easy to actually apply, store, organize, and keep track of it over time.

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
  |-- docs/
  |-- cypress/
  |-- packages/
    |-- web/ # Our core application that users engage with on the web
    |-- j-mail/ # An application handling transactional email via a messaging queue and scheduled jobs against the DB
    |-- j-db-client/ # A database client that can be imported into any service to interact with the db
      |-- schema.prisma # our database schema
      |-- migrations/
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
1. Run `npm run build`

#### Setting Up Your Local DB Instance

1. Install Postgres
   - For Mac users, we recommend using Homebrew. Linux users will probably want to use your distro's postgres package manager
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

1. Update your `.env` file with your new postgres username & password.
1. Set the env var `DATABASE_URL` to be the value in your `.env` file (the server will consult the `.env` file but for standalone scripts, you must set the environment variable). This looks like: `export DATABASE_URL='postgresql://<user>:<password>@localhost:5432/<db_name>'`

1. Seed the database with:

   ```
   $ npm run db:seed
   ```

   BOOM! You now have some users, along with a wee selection of posts :)

1. Finally apply database migrations to your new database instance:

   ```bash
   $ npm run migrate:apply
   ```

   You've got a local Journaly PostgreSQL DB, woohoo! 🎉

#### Useful Commands For Working With Your DB

- Start up your psql `journaly_db` shell: `psql <your_db_url>`
- Take a snapshot of the DB's current state: `npm run db:snapshot` (creates `snapshot.sql`)
- Restore your database to exactly the state captured in `snapshot.sql`: `npm run db:restore`
- Update the generated GQL queries/mutations for use on the front end: `npm run codegen`

#### Test Data

The seed script contains a handful of test users and posts to cut down on data creation efforts. Here are some users you can log in as:

| ID | Email | Password | Description |
|----|-------|----------|-------------|
| 1 | robert@baratheon.net | password | Administrator account |
| 2 | jon@arryn.net | password | Moderator account |
| 3 | j@n.com | password | Standard user with indefinite premium subscription and posts. Kind of our "kitchen sink" account. |
| 4 | gold@gold.gold | password | Standard user with comments and posts, no premium subscription. |

### Running Journaly

To run the entire app in local development mode, simply run `npm run dev` from the `packages/web` directory!

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

## Scripts

### greant-free-subscription

Usage:

```
npm run grant-free-subscription <user id> <months>
```

Be sure to set the following env vars:
- `DATABASE_URL`
- `FREE_PRICE_ID`
- `STRIPE_SECRET_KEY` 


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

### Translations

If you'd like to help translate Journaly into your native language, we'd love to have your help! Head over to the [translations site](http://translations-website.s3-website.us-east-2.amazonaws.com/) to get started.

