-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "authorLanguageLevel" "LanguageLevel" NOT NULL DEFAULT E'BEGINNER';

-- AlterTable
ALTER TABLE "PostComment" ADD COLUMN     "authorLanguageLevel" "LanguageLevel" NOT NULL DEFAULT E'BEGINNER';

-- Backfill
-- Update all previous Comments & PostComments to have author's current level
-- NOTE: comments from authors without the language listed will remain BEGINNER
WITH sq AS (
	SELECT "Comment".id,
		   "Comment"."authorLanguageLevel",
		   "Comment"."authorId",
		   "LanguageRelation"."userId",
		   "LanguageRelation"."level"
	FROM "Comment"
	JOIN "LanguageRelation"
	  ON "Comment"."authorId" = "LanguageRelation"."userId"
)
UPDATE "Comment"
SET "authorLanguageLevel" = sq.level
FROM sq
WHERE "Comment".id = sq.id;
