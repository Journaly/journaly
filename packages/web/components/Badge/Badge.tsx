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
    // Posts
    case BadgeType.TenPosts:
      return 'badge.TEN_POSTS'
    case BadgeType.TwentyPosts:
      return 'badge.TWENTY_POSTS'
    case BadgeType.FiftyPosts:
      return 'badge.FIFTY_POSTS'
    case BadgeType.OnehundredComments:
      return 'badge.ONEHUNDRED_POSTS'
    case BadgeType.OnehundredfiftyPosts:
      return 'badge.ONEHUNDREDFIFTY_POSTS'
    case BadgeType.TwohundredPosts:
      return 'badge.TWOHUNDRED_POSTS'
    case BadgeType.TwohundredfiftyComments:
      return 'badge.TWOHUNDREDFIFTY_POSTS'
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
    // Feedback - Posts
    case BadgeType.CorrectTenPosts:
      return 'badge.CORRECT_TEN_POSTS'
    case BadgeType.CorrectTenPosts:
      return 'badge.CORRECT_TWENTYFIVE_POSTS'
    case BadgeType.CorrectTenPosts:
      return 'badge.CORRECT_FIFTY_POSTS'
    case BadgeType.CorrectTenPosts:
      return 'badge.CORRECT_ONEHUNDRED_POSTS'
    case BadgeType.CorrectTenPosts:
      return 'badge.CORRECT_ONEHUNDREDFIFTY_POSTS'
    case BadgeType.CorrectTenPosts:
      return 'badge.CORRECT_TWOHUNDREDFIFTY_POSTS'
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
    // Goals
    case BadgeType.Hiker:
      return 'badge.HIKER'
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
