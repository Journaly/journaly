# Journaly Packages & Services

The Journaly project consists of several independent packages & services. Here, we're showing only these packages for clarity:

```
|-- journaly/
|---- packages/
|------ web/
|------ j-mail/
|------ j-db-client/
```

We also have an additional package, _Thumbbuster_, which will also be described below. This one lives in its own repository within the Journaly organization. You can also visit [the Thumbbuster repo](https://github.com/Journaly/thumbbuster) for more detailed documentation.

## Web

- This is our core web application that users interact with.
- Contains all client-side and server-side application code.

[See docs](./web/README.md)

## J-Mail

- A simple managed queue service that uses AWS Lambda & SQS to process events that require a transactional email to be sent from the application.
- Can also run scheduled jobs such as our "Daily Digest Email" that runs once per day, batching all events from our `pendingNotifications` table and delivering a single email to each user who has had activity in the last 24 hours.

[See docs](./j-mail/README.md)

## J-DB-Client

- An internal database client that can be imported into any of the other Journaly services in order to perform database operations.

[See docs](./j-db-client/README.md)

## Thumbbuster

- Handles uploading images and also performing transforms on those uploads to generate small (thumbnail) and large sizes of each image.
- Also handles storing those images and serving them to the web application.

[See docs](https://github.com/Journaly/thumbbuster)
