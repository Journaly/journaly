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
      return 'ALPHA_USER'
    case BadgeType.BetaUser:
      return 'BETA_USER'
    case BadgeType.BugHunter:
      return 'BUG_HUNTER'
    case BadgeType.CodeContributor:
      return 'CODE_CONTRIBUTOR'
    case BadgeType.Odradek:
      return 'ODRADEK'
    case BadgeType.Necromancer:
      return 'NECROMANCER'
    case BadgeType.SpamReporter:
      return 'SPAM_REPORTER'
    case BadgeType.Default:
      return 'DEFAULT'

    // Posts
    case BadgeType.TenPosts:
      return 'TEN_POSTS'
    case BadgeType.TwentyPosts:
      return 'TWENTY_POSTS'
    case BadgeType.FiftyPosts:
      return 'FIFTY_POSTS'
    case BadgeType.SeventyfivePosts:
      return 'SEVENTYFIVE_POSTS'
    case BadgeType.OnehundredPosts:
      return 'ONEHUNDRED_POSTS'
    case BadgeType.OnehundredfiftyPosts:
      return 'ONEHUNDREDFIFTY_POSTS'
    case BadgeType.TwohundredPosts:
      return 'TWOHUNDRED_POSTS'
    case BadgeType.TwohundredfiftyPosts:
      return 'TWOHUNDREDFIFTY_POSTS'
    case BadgeType.ThreehundredfiftyPosts:
      return 'THREEHUNDREDFIFTY_POSTS'
    case BadgeType.FivehundredPosts:
      return 'FIVEHUNDRED_POSTS'

    // Feedback - Comments
    case BadgeType.TenComments:
      return 'TEN_COMMENTS'
    case BadgeType.FiftyComments:
      return 'FIFTY_COMMENTS'
    case BadgeType.OnehundredComments:
      return 'ONEHUNDRED_COMMENTS'
    case BadgeType.TwohundredfiftyComments:
      return 'TWOHUNDREDFIFTY_COMMENTS'
    case BadgeType.FivehundredComments:
      return 'FIVEHUNDRED_COMMENTS'
    case BadgeType.OnethousandComments:
      return 'ONETHOUSAND_COMMENTS'
    case BadgeType.OnethousandfivehundredComments:
      return 'ONETHOUSANDFIVEHUNDRED_COMMENTS'
    case BadgeType.TwothousandComments:
      return 'TWOTHOUSAND_COMMENTS'
    case BadgeType.TwothousandfivehundredComments:
      return 'TWOTHOUSANDFIVEHUNDRED_COMMENTS'
    case BadgeType.FivethousandComments:
      return 'FIVETHOUSAND_COMMENTS'
    
      // Comments - Posts
    case BadgeType.TenPostComments:
      return 'TEN_POST_COMMENTS'
    case BadgeType.FiftyPostComments:
      return 'FIFTY_POST_COMMENTS'
    case BadgeType.OnehundredPostComments:
      return 'ONEHUNDRED_COMMENTS'
    case BadgeType.TwohundredPostComments:
      return 'TWOHUNDRED_POST_COMMENTS'
    case BadgeType.ThreehundredPostComments:
      return 'THREEHUNDRED_POST_COMMENTS'

    // Feedback - Posts
    case BadgeType.CorrectTenPosts:
      return 'CORRECT_TEN_POSTS'
    case BadgeType.CorrectTwentyfivePosts:
      return 'CORRECT_TWENTYFIVE_POSTS'
    case BadgeType.CorrectFiftyPosts:
      return 'CORRECT_FIFTY_POSTS'
    case BadgeType.CorrectOnehundredPosts:
      return 'CORRECT_ONEHUNDRED_POSTS'
    case BadgeType.CorrectOnehundredfiftyPosts:
      return 'CORRECT_ONEHUNDREDFIFTY_POSTS'
    case BadgeType.CorrectTwohundredfiftyPosts:
      return 'CORRECT_TWOHUNDREDFIFTY_POSTS'
    case BadgeType.CorrectFivehundredPosts:
      return 'CORRECT_FIVEHUNDRED_POSTS'
    case BadgeType.CorrectOnethousandPosts:
      return 'CORRECT_ONETHOUSAND_POSTS'

    // Thanks
    case BadgeType.TenThanks:
      return 'TEN_THANKS'
    case BadgeType.FiftyThanks:
      return 'FIFTY_THANKS'
    case BadgeType.OnehundredThanks:
      return 'ONEHUNDRED_THANKS'
    case BadgeType.TwohundredfiftyThanks:
      return 'TWOHUNDREDFIFTY_THANKS'
    case BadgeType.FivehundredThanks:
      return 'FIVEHUNDRED_THANKS'
    case BadgeType.OnethousandThanks:
      return 'ONETHOUSAND_THANKS'
    case BadgeType.OnethousandtwohundredfiftyThanks:
      return 'ONETHOUSANDTWOHUNDREDFIFTY_THANKS'
    case BadgeType.OnethousandfivehundredThanks:
      return 'ONETHOUSANDFIVEHUNDRED_THANKS'
    case BadgeType.TwothousandtwohundredfiftyThanks:
      return 'TWOTHOUSANDTWOHUNDREDFIFTY_THANKS'
    case BadgeType.TwothousandfivehundredThanks:
      return 'TWOTHOUSANDFIVEHUNDRED_THANKS'
    case BadgeType.FivethousandThanks:
      return 'FIVETHOUSAND_THANKS'
    case BadgeType.TenthousandThanks:
      return 'TENTHOUSAND_THANKS'
    
      // Thanks Given
    case BadgeType.TenThanksGiven:
      return 'TEN_THANKS_GIVEN'
    case BadgeType.FiftyThanksGiven:
      return 'FIFTY_THANKS_GIVEN'
    case BadgeType.OnehundredThanksGiven:
      return 'ONEHUNDRED_THANKS_GIVEN'
    case BadgeType.TwohundredfiftyThanksGiven:
      return 'TWOHUNDREDFIFTY_THANKS_GIVEN'
    case BadgeType.FivehundredThanksGiven:
      return 'FIVEHUNDRED_THANKS_GIVEN'
    case BadgeType.OnethousandThanksGiven:
      return 'ONETHOUSAND_THANKS_GIVEN'
    case BadgeType.TwothousandtwohundredfiftyThanksGiven:
      return 'TWOTHOUSANDTWOHUNDREDFIFTY_THANKS_GIVEN'
    case BadgeType.TwothousandfivehundredThanksGiven:
      return 'TWOTHOUSANDFIVEHUNDRED_THANKS_GIVEN'
    case BadgeType.FivethousandThanksGiven:
      return 'FIVETHOUSAND_THANKS_GIVEN'
    case BadgeType.TenthousandThanksGiven:
      return 'TENTHOUSAND_THANKS_GIVEN'

    // Goals
    case BadgeType.Hiker:
      return 'HIKER'
    // TODO: provider real translations. Do not merge until this is done.
    case BadgeType.TrailRunner:
      return 'TrailRunner'
    case BadgeType.MountainClimber:
      return 'MountainClimber'

    case BadgeType.Novelist:
      return 'NOVELIST'
    case BadgeType.Multilingual:
      return 'MULTILINGUAL'
    case BadgeType.Polyglot:
      return 'POLYGLOT'
    case BadgeType.Helper:
      return 'HELPER'
  }

  return assertUnreachable(badgeType)
}

const getBadgeTitle = (badgeType: BadgeType): string => `${getBadgeCopySubpath(badgeType)}.title`
const getBadgeDescription = (badgeType: BadgeType): string =>
  `${getBadgeCopySubpath(badgeType)}.description`

const BadgeComponent: React.FC<Props> = ({ badge }) => {
  const { t } = useTranslation('badge')

  return (
    <>
      <div className="badge">
        <img title={`${t(getBadgeTitle(badge.type))}: ${t(getBadgeDescription(badge.type))}`} src={`/images/badges/${badge.type}.svg`} alt="" />
      </div>

      <style jsx>{`
        .badge {
          display: flex;  
          align-items: center;
          padding: 1px 11px;
          cursor: pointer;
          color: ${theme.colors.white};
        }

        img {
          height: 110px;
          width: 110px;
        }
      `}</style>
    </>
  )
}

export default BadgeComponent
