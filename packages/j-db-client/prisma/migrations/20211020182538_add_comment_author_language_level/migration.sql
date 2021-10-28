-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "authorLanguageLevel" "LanguageLevel" NOT NULL DEFAULT E'BEGINNER';

-- AlterTable
ALTER TABLE "PostComment" ADD COLUMN     "authorLanguageLevel" "LanguageLevel" NOT NULL DEFAULT E'BEGINNER';

-- Backfill
-- Update all previous Comments & PostComments to have author's current level
-- NOTE: comments from authors without the language listed will remain BEGINNER

-- Part 1: Comments

WITH sq AS (
	SELECT "Comment".id,
		   "Comment"."authorLanguageLevel",
		   "Comment"."authorId",
		   "LanguageRelation"."userId",
		   "LanguageRelation"."level"
	FROM "Comment"
  JOIN "Thread" ON "Thread".id = "Comment"."threadId"
  JOIN "Post" ON "Post".id = "Thread"."postId"
	JOIN "LanguageRelation"
	  ON "Comment"."authorId" = "LanguageRelation"."userId"
    AND "LanguageRelation"."languageId" = "Post"."languageId"
)
UPDATE "Comment"
SET "authorLanguageLevel" = sq.level
FROM sq
WHERE "Comment".id = sq.id;

-- Part 2: PostComments

WITH sq AS (
	SELECT "PostComment".id,
		   "PostComment"."authorLanguageLevel",
		   "PostComment"."authorId",
		   "LanguageRelation"."userId",
		   "LanguageRelation"."level"
	FROM "PostComment"
	JOIN "Post" ON "Post".id = "PostComment"."postId"
	JOIN "LanguageRelation"
	  ON "PostComment"."authorId" = "LanguageRelation"."userId"
    AND "LanguageRelation"."languageId" = "Post"."languageId"
)
UPDATE "PostComment"
SET "authorLanguageLevel" = sq.level
FROM sq
WHERE "PostComment".id = sq.id;
