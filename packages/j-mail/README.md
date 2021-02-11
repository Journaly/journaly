# J-Mail

## A splendid email queue service @ Journaly.

J-Mail is an application that communicates with the `web` service to handle transactional emails from within the application.

It consists of a managed queue service (Amazon SQS) and Lambdas that can either process events directly or run scheduled jobs against the DB, such as for the Daily Digest Emails.
