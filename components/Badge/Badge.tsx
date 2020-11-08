import React from 'react'

import {
  UserBadgeFragmentFragment as Badge,
  BadgeType
} from '../../generated/graphql'
import { useTranslation } from '../../config/i18n'
import theme from '../../theme'

type Props = {
  badge: Badge
}

const getBadgeCopySubpath = (badgeType: BadgeType): string => {
  console.log(badgeType, BadgeType)
  switch (badgeType) {
    case BadgeType.AlphaUser:
      return 'badge.ALPHA_USER'
    case BadgeType.BetaUser:
      return 'badge.BETA_USER'
    case BadgeType.OnehundredPosts:
      return 'badge.ONEHUNDRED_POSTS'
  }
}

const getBadgeTitle = (badgeType: BadgeType): string => `${getBadgeCopySubpath(badgeType)}.title`
const getBadgeDescription = (badgeType: BadgeType): string => `${getBadgeCopySubpath(badgeType)}.description`

const BadgeComponent: React.FC<Props> = ({ badge }) => {
  const { t } = useTranslation('common')

  return (
    <>
      <div className="badge" title={t(getBadgeDescription(badge.type))}>
        <div className="badge-icon" />
        <span className="title">{ t(getBadgeTitle(badge.type)) }</span>
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
