#!/usr/bin/env bash
set -x

# This file is kind of stupid and really shouldn't need to exist. Use it ONLY
# if you find yourself in the following situation:
# - You don't _really_ care about your data, you're in a dev env
# - One of:
#   - BOTH: 
#     - You have a database that was created with pre-2.21.0 prisma
#     - You want to upgrade it to a prisma 2.21.0+ compatible DB
#   - OR: Prisma is complaining about a migration modified after application AND you know the mig does not need to be re-run
#
# Never run this against stage or prod. We'll use `prisma migrate deploy` for
# that.

# Dump data only
pg_dump --data-only --exclude-table=_prisma_migrations $DATABASE_URL > tmpsnap.sql

# Totally axe the DB so next migrate dev will bring it back up
psql $DATABASE_URL  -c 'DROP SCHEMA public CASCADE; CREATE SCHEMA public;'

# Apply all the mids
npm run migrate:apply

# Restore data
cat tmpsnap.sql | psql $DATABASE_URL

# Cleanup
rm tmpsnap.sql

