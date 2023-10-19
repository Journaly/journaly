-- Custom Migration
-- When an InAppNotification loses all of its children,
-- it needs to be cleaned up as well to avoid breaking the
-- Notification Feed.
--
-- This migration creates a DB function to do that,
-- and then sets up DB triggers for each sub-notification table.

-- -- QUERY TO FIND AND CLEAN UP ANY EXISTING TOXIC NOTIFICATIONS
-- DELETE
-- FROM "InAppNotification"
-- WHERE id IN (
-- SELECT
--   ian.id
-- FROM "InAppNotification" AS ian
-- FULL JOIN "ThreadCommentThanksNotification" AS tct
--   ON tct."notificationId" = ian.id
-- FULL JOIN "PostClapNotification" AS pc
--   ON pc."notificationId" = ian.id
-- FULL JOIN "MentionNotification" AS m
--   ON m."notificationId" = ian.id
-- FULL JOIN "NewPostNotification" AS np
--   ON np."notificationId" = ian.id
-- FULL JOIN "ThreadCommentNotification" AS c
--   ON c."notificationId" = ian.id
-- FULL JOIN "NewFollowerNotification" AS nf
--   ON nf."notificationId" = ian.id
-- FULL JOIN "PostCommentNotification" AS pct
--   ON pct."notificationId" = ian.id
-- -- WHERE ian.id = 113459
-- GROUP BY ian.id
-- HAVING COUNT(tct.id) + COUNT(pc.id) + COUNT(m.id) + COUNT(np.id) + COUNT(c.id) + COUNT(nf.id) + COUNT(pct.id) = 0);


-- -- Set up DB trigger
CREATE OR REPLACE FUNCTION clean_up_childless_inappnotifications()
  RETURNS TRIGGER
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
	DELETE
		FROM "InAppNotification"
		WHERE id IN (
			SELECT
			  ian.id
			FROM "InAppNotification" AS ian
			FULL JOIN "ThreadCommentThanksNotification" AS tct
			  ON tct."notificationId" = ian.id
			FULL JOIN "PostClapNotification" AS pc
			  ON pc."notificationId" = ian.id
			FULL JOIN "MentionNotification" AS m
			  ON m."notificationId" = ian.id
			FULL JOIN "NewPostNotification" AS np
			  ON np."notificationId" = ian.id
			FULL JOIN "ThreadCommentNotification" AS c
			  ON c."notificationId" = ian.id
			FULL JOIN "NewFollowerNotification" AS nf
			  ON nf."notificationId" = ian.id
			FULL JOIN "PostCommentNotification" AS pct
			  ON pct."notificationId" = ian.id
			WHERE ian.id = OLD."notificationId"
			GROUP BY ian.id
			HAVING
				COUNT(tct.id) +
				COUNT(pc.id) +
				COUNT(m.id) +
				COUNT(np.id) +
				COUNT(c.id) +
				COUNT(nf.id) +
				COUNT(pct.id) = 0
			);
	RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS on_thread_comment_notification_deletion
ON "ThreadCommentNotification";

CREATE TRIGGER on_thread_comment_notification_deletion
AFTER DELETE
ON "ThreadCommentNotification"
FOR EACH ROW
EXECUTE PROCEDURE clean_up_childless_inappnotifications();

--

DROP TRIGGER IF EXISTS on_post_comment_notification_deletion
ON "PostCommentNotification";

CREATE TRIGGER on_post_comment_notification_deletion
AFTER DELETE
ON "PostCommentNotification"
FOR EACH ROW
EXECUTE PROCEDURE clean_up_childless_inappnotifications();

--

DROP TRIGGER IF EXISTS on_thread_comment_thanks_notification_deletion
ON "ThreadCommentThanksNotification";

CREATE TRIGGER on_thread_comment_thanks_notification_deletion
AFTER DELETE
ON "ThreadCommentThanksNotification"
FOR EACH ROW
EXECUTE PROCEDURE clean_up_childless_inappnotifications();

--

DROP TRIGGER IF EXISTS on_post_clap_notification_deletion
ON "PostClapNotification";

CREATE TRIGGER on_post_clap_notification_deletion
AFTER DELETE
ON "PostClapNotification"
FOR EACH ROW
EXECUTE PROCEDURE clean_up_childless_inappnotifications();

--

DROP TRIGGER IF EXISTS on_mention_notification_deletion
ON "MentionNotification";

CREATE TRIGGER on_mention_notification_deletion
AFTER DELETE
ON "MentionNotification"
FOR EACH ROW
EXECUTE PROCEDURE clean_up_childless_inappnotifications();

--

DROP TRIGGER IF EXISTS on_new_post_notification_deletion
ON "NewPostNotification";

CREATE TRIGGER on_new_post_notification_deletion
AFTER DELETE
ON "NewPostNotification"
FOR EACH ROW
EXECUTE PROCEDURE clean_up_childless_inappnotifications();

--

DROP TRIGGER IF EXISTS on_new_follower_notification_deletion
ON "NewFollowerNotification";

CREATE TRIGGER on_new_follower_notification_deletion
AFTER DELETE
ON "NewFollowerNotification"
FOR EACH ROW
EXECUTE PROCEDURE clean_up_childless_inappnotifications();
