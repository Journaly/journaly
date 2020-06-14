# Journaly

###### @ [journaly.com](http://journaly.com)

_A foreign-language journaling application where you can exchange feedback with native speakers._

---

Welcome to the Journaly repository!

The application is built with JavaScript/TypeScript on both the frontend and backend with a GraphQL API, leveraging powerful frameworks such as React, Next, and Apollo on the frontend and Prisma, Nexus, and Express on the backend, with a PostgreSQL database with Amazon RDS.

We use Python for data science, leveraging a number of powerful libraries for data aggregation and analysis, data visualization, and machine learning, such as NumPy, Pandas, Matplotlib, Seaborn, SciKit, and more.

## Architecture

```
|- FRONTEND
   |- React.js
   |- Next.js
   |- Apollo
   |- TypeScript
|- BACKEND
   |- Prisma
   |- Nexus
   |- Express.js
   |- TypeScript
|- DATABASE
   |- Amazon RDS // PostgreSQL
```

---

## Getting Started (in progress)

### Initial Setup

1. Clone the repository!
   ```sh
   $ git clone git@github.com:Journaly/journaly.git
   ```
1. In your backend directory, locate your `.env.example` file and create a new one alongside it called `.env`
1. Run `npm ci` in both the `frontend` and `backend` directories

#### Setting Up Your Local DB Instance

1. Install Postgres with Homebrew
   _Note that this set your Postgres DB to run when your computer starts up and will stay running in the background_.

```bash
$ brew install postgres
$ brew services start postgresql
```

2. Start up your Postgres shell and create your user

```bash
$ psql postgres
$ create user <your_username> with createdb password '<your_password>';
```

3. Create your local instance of Journaly DB and give your user permissions

```bash
$ create database journaly_db;
$ alter user <your_username> with superuser;
```

4. Apply database migrations to your new database instance:

```bash
$ npx prisma migrate up --experimental
```

5. Finally, go to your `.env` file in the backend directory and replace the placeholders with your new postgres username & password.

You've got a local Journaly PostgreSQL DB, woohoo! 🎉

#### Useful Commands For Working With Your DB

- Start up your psql `journaly_db` shell: `psql <your_db_url>`

### Running Journaly

1. To run the entire app in local development mode, simply run `npm run dev` from the root of the project! This will use `concurrently` to start up both the frontend and backend dev servers.
2. If you would like to run frontend or backend separately, you can run `npm run dev` from each respective directory.

### Seeding your database

3. Let's seed that baby DB!  
   `$ cd backend/`
   `$ npm run seed`

BOOM! You now have some users, along with a wee selection of posts :)

To marvel at the results, go to `http://localhost:4000` and try the following query:

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

Next, check out [frontend](./frontend/README.md) or [backend](./backend/README.md) for detailed information on how to work across the app.

## More Helpful Docs

1. [Debugging Journaly With VS Code](./docs/debugging.md)

## Contributing To Journaly

If you'd like to become a contributor -- awesome!
Please read our [contributing guide](./docs/contributing-guide.md) to get started :)
