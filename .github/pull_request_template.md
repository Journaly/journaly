## Description

**Issue:** <#issue>

...

Journaly.com profile url (include if you'd like the "code contributor" badge):

## Subtasks

- [ ] I have added this PR to the Journaly Kanban project ✅
- [ ] ...

### Deployment Checklist

- [ ] 🚨 Publish new j-db-client version and update in both `web` and `j-mail`
- [ ] 🚨 Deploy migs to stage
- [ ] 🚨 Deploy code to stage
- [ ] 🚨 DEPLOY `j-mail` to stage
- [ ] 🚨 Deploy migs to prod
- [ ] 🚨 Deploy code to prod
- [ ] 🚨 DEPLOY `j-mail` TO PROD

## Migrations

If your PR doesn't involve any changes to the database, you can delete this section. If it does, briefly describe how it needs to be applied. Some common things you might mention are:

- Does the migration need to be applied before or after deploying code?
- Is applying the migration going to necessitate downtime?
- Is there any SQL or backfill logic that has to be run manually?
- Are the DB changes high risk in your estimation? Should a manual DB snapshot be taken before applying?

## Screenshots
