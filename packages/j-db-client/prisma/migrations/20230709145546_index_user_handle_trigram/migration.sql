CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX user_handle_trgm_idx ON "User" USING gist (handle gist_trgm_ops);
