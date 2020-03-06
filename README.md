# Journaly

###### @ [journaly.com](http://journaly.com)

_A foreign-language journaling application where you can exchange feedback with native speakers._

---

Welcome to the Journaly repository!

## Architecture

```
|- FRONTEND
   |- React.js
   |- Next.js
   |- Apollo
   |- TypeScript
|- BACKEND
   |- Prisma
   |- Nexus-Future
   |- Express.js
   |- TypeScript
|- DATABASE
   |- PostgreSQL
|- DOCKER
   |- services
      |- frontend
      |- backend
      |- db
```

---

## Getting Started (in progress)

1. Clone the repository!  
   `$ git clone git@github.com:Journaly/journaly.git`
2. In your backend directory, locate your `.env.example` file and rename it to `.env`
3. Run `npm ci` in both the `frontend` and `backend` directories
4. In the root of the project (`journaly/`), run `$ docker-compose up -d` - this will spin up the DB and frontend for you -- just like that!
5. Finally, you just need to run `npm run dev` from the backend directory

Not only do you now have the entire journaly app and all its 3 services running, but you have a local PostgreSQL database instance running on your machine with persistant storage! :)

4. Let's seed that baby DB!  
   `$ cd backend/`
   `$ npm run seed`

BOOM! You now have some users, along with a wee selection of posts :)

5. To bring the app down, run `$ docker-compose stop`

Next, check out [frontend](./frontend) or [backend](./backend) for detailed information on how to work across the app.
