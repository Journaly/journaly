-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "bumpedAt" TIMESTAMP(3),
ADD COLUMN     "bumpCount" INTEGER NOT NULL DEFAULT 0;

-- Backfill all Posts so that bumpedAt = publishedAt

WITH sq AS (
    SELECT *
    FROM "Post"
)
UPDATE "Post"
SET "bumpedAt" = sq."publishedAt"
FROM sq
WHERE "Post".id = sq.id;