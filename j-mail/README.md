# J-Mail
## A splendid email queue service @ Journaly.

J-Mail is a simple service that uses AWS Lambda & SQS to process events that require a transactional email to be sent from the application. This enables important functionality such as email batching.

An excellent use case is comment notification emails where a user is likely to receive a series of comments in quick succession and we don't want to bombard them with 20 email notifications. This has very positive implications on the User Experience and also our email server costs.

This is a serverless microservice is deployed and managed with the Serverless framework.
