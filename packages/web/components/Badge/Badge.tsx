import React from 'react'

import { UserBadgeFragmentFragment as Badge, BadgeType } from '@/generated/graphql'
import { useTranslation } from '@/config/i18n'
import theme from '@/theme'

type Props = {
  badge: Badge
}

const assertUnreachable = (x: never): never => {
  throw new Error(`Didn't expect to get here ${x}`)
}

const getBadgeCopySubpath = (badgeType: BadgeType): string => {
  switch (badgeType) {
    // Misc Achievements
    case BadgeType.AlphaUser:
      return 'badge.ALPHA_USER'
    case BadgeType.BetaUser:
      return 'badge.BETA_USER'
    case BadgeType.BugHunter:
      return 'badge.BUG_HUNTER'
    case BadgeType.CodeContributor:
      return 'badge.CODE_CONTRIBUTOR'
    case BadgeType.Odradek:
      return 'badge.ODRADEK'
    case BadgeType.Necromancer:
      return 'badge.NECROMANCER'
    case BadgeType.SpamReporter:
      return 'badge.SPAM_REPORTER'
    case BadgeType.Default:
      return 'badge.DEFAULT'

    // Posts
    case BadgeType.TenPosts:
      return 'badge.TEN_POSTS'
    case BadgeType.TwentyPosts:
      return 'badge.TWENTY_POSTS'
    case BadgeType.FiftyPosts:
      return 'badge.FIFTY_POSTS'
    case BadgeType.SeventyfivePosts:
      return 'badge.SEVENTYFIVE_POSTS'
    case BadgeType.OnehundredPosts:
      return 'badge.ONEHUNDRED_POSTS'
    case BadgeType.OnehundredfiftyPosts:
      return 'badge.ONEHUNDREDFIFTY_POSTS'
    case BadgeType.TwohundredPosts:
      return 'badge.TWOHUNDRED_POSTS'
    case BadgeType.TwohundredfiftyPosts:
      return 'badge.TWOHUNDREDFIFTY_POSTS'
    case BadgeType.ThreehundredfiftyPosts:
      return 'badge.THREEHUNDREDFIFTY_POSTS'
    case BadgeType.FivehundredPosts:
      return 'badge.FIVEHUNDRED_POSTS'

    // Feedback - Comments
    case BadgeType.TenComments:
      return 'badge.TEN_COMMENTS'
    case BadgeType.FiftyComments:
      return 'badge.FIFTY_COMMENTS'
    case BadgeType.OnehundredComments:
      return 'badge.ONEHUNDRED_COMMENTS'
    case BadgeType.TwohundredfiftyComments:
      return 'badge.TWOHUNDREDFIFTY_COMMENTS'
    case BadgeType.FivehundredComments:
      return 'badge.FIVEHUNDRED_COMMENTS'
    case BadgeType.OnethousandComments:
      return 'badge.ONETHOUSAND_COMMENTS'
    case BadgeType.OnethousandfivehundredComments:
      return 'badge.ONETHOUSANDFIVEHUNDRED_COMMENTS'
    case BadgeType.TwothousandComments:
      return 'badge.TWOTHOUSAND_COMMENTS'
    case BadgeType.TwothousandfivehundredComments:
      return 'badge.TWOTHOUSANDFIVEHUNDRED_COMMENTS'
    case BadgeType.FivethousandComments:
      return 'badge.FIVETHOUSAND_COMMENTS'
    
      // Comments - Posts
    case BadgeType.TenPostComments:
      return 'badge.TEN_POST_COMMENTS'
    case BadgeType.FiftyPostComments:
      return 'badge.FIFTY_POST_COMMENTS'
    case BadgeType.OnehundredPostComments:
      return 'badge.ONEHUNDRED_COMMENTS'
    case BadgeType.TwohundredPostComments:
      return 'badge.TWOHUNDRED_POST_COMMENTS'
    case BadgeType.ThreehundredPostComments:
      return 'badge.THREEHUNDRED_POST_COMMENTS'

    // Feedback - Posts
    case BadgeType.CorrectTenPosts:
      return 'badge.CORRECT_TEN_POSTS'
    case BadgeType.CorrectTwentyfivePosts:
      return 'badge.CORRECT_TWENTYFIVE_POSTS'
    case BadgeType.CorrectFiftyPosts:
      return 'badge.CORRECT_FIFTY_POSTS'
    case BadgeType.CorrectOnehundredPosts:
      return 'badge.CORRECT_ONEHUNDRED_POSTS'
    case BadgeType.CorrectOnehundredfiftyPosts:
      return 'badge.CORRECT_ONEHUNDREDFIFTY_POSTS'
    case BadgeType.CorrectTwohundredfiftyPosts:
      return 'badge.CORRECT_TWOHUNDREDFIFTY_POSTS'
    case BadgeType.CorrectFivehundredPosts:
      return 'badge.CORRECT_FIVEHUNDRED_POSTS'
    case BadgeType.CorrectOnethousandPosts:
      return 'badge.CORRECT_ONETHOUSAND_POSTS'

    // Thanks
    case BadgeType.TenThanks:
      return 'badge.TEN_THANKS'
    case BadgeType.FiftyThanks:
      return 'badge.FIFTY_THANKS'
    case BadgeType.OnehundredThanks:
      return 'badge.ONEHUNDRED_THANKS'
    case BadgeType.TwohundredfiftyThanks:
      return 'badge.TWOHUNDREDFIFTY_THANKS'
    case BadgeType.FivehundredThanks:
      return 'badge.FIVEHUNDRED_THANKS'
    case BadgeType.OnethousandThanks:
      return 'badge.ONETHOUSAND_THANKS'
    case BadgeType.OnethousandtwohundredfiftyThanks:
      return 'badge.ONETHOUSANDTWOHUNDREDFIFTY_THANKS'
    case BadgeType.OnethousandfivehundredThanks:
      return 'badge.ONETHOUSANDFIVEHUNDRED_THANKS'
    case BadgeType.TwothousandtwohundredfiftyThanks:
      return 'badge.TWOTHOUSANDTWOHUNDREDFIFTY_THANKS'
    case BadgeType.TwothousandfivehundredThanks:
      return 'badge.TWOTHOUSANDFIVEHUNDRED_THANKS'
    case BadgeType.FivethousandThanks:
      return 'badge.FIVETHOUSAND_THANKS'
    case BadgeType.TenthousandThanks:
      return 'badge.TENTHOUSAND_THANKS'
    
      // Thanks Given
    case BadgeType.TenThanksGiven:
      return 'badge.TEN_THANKS_GIVEN'
    case BadgeType.FiftyThanksGiven:
      return 'badge.FIFTY_THANKS_GIVEN'
    case BadgeType.OnehundredThanksGiven:
      return 'badge.ONEHUNDRED_THANKS_GIVEN'
    case BadgeType.TwohundredfiftyThanksGiven:
      return 'badge.TWOHUNDREDFIFTY_THANKS_GIVEN'
    case BadgeType.FivehundredThanksGiven:
      return 'badge.FIVEHUNDRED_THANKS_GIVEN'
    case BadgeType.OnethousandThanksGiven:
      return 'badge.ONETHOUSAND_THANKS_GIVEN'
    case BadgeType.TwothousandtwohundredfiftyThanksGiven:
      return 'badge.TWOTHOUSANDTWOHUNDREDFIFTY_THANKS_GIVEN'
    case BadgeType.TwothousandfivehundredThanksGiven:
      return 'badge.TWOTHOUSANDFIVEHUNDRED_THANKS_GIVEN'
    case BadgeType.FivethousandThanksGiven:
      return 'badge.FIVETHOUSAND_THANKS_GIVEN'
    case BadgeType.TenthousandThanksGiven:
      return 'badge.TENTHOUSAND_THANKS_GIVEN'

    // Goals
    case BadgeType.Hiker:
      return 'badge.HIKER'
    // TODO: provider real translations. Do not merge until this is done.
    case BadgeType.TrailRunner:
      return 'badge.TrailRunner'
    case BadgeType.MountainClimber:
      return 'badge.MountainClimber'

    case BadgeType.Novelist:
      return 'badge.NOVELIST'
    case BadgeType.Multilingual:
      return 'badge.MULTILINGUAL'
    case BadgeType.Polyglot:
      return 'badge.POLYGLOT'
    case BadgeType.Helper:
      return 'badge.HELPER'
  }

  return assertUnreachable(badgeType)
}

const getBadgeTitle = (badgeType: BadgeType): string => `${getBadgeCopySubpath(badgeType)}.title`
const getBadgeDescription = (badgeType: BadgeType): string =>
  `${getBadgeCopySubpath(badgeType)}.description`

const BadgeComponent: React.FC<Props> = ({ badge }) => {
  const { t } = useTranslation('common')

  return (
    <>
      <div className="badge" title={t(getBadgeDescription(badge.type))}>
        <div className="badge-icon" />
        <span className="title">{t(getBadgeTitle(badge.type))}</span>
      </div>

      <style jsx>{`
        .badge {
          display: flex;
          align-items: center;
          padding: 1px 11px;
          cursor: pointer;

          background-color: ${theme.colors.charcoal};
          color: ${theme.colors.white};
          border-radius: 3px;
          border: 1px solid #484848;
        }

        .badge-icon {
          display: block;
          width: 5px;
          height: 5px;
          background-color: ${theme.colors.copper};
          border-radius: 3px;
          margin-right: 5px;
        }
      `}</style>
    </>
  )
}

export default BadgeComponent
