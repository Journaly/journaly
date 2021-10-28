-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "authorLanguageLevel" "LanguageLevel" NOT NULL DEFAULT E'BEGINNER';

-- AlterTable
ALTER TABLE "PostComment" ADD COLUMN     "authorLanguageLevel" "LanguageLevel" NOT NULL DEFAULT E'BEGINNER';
