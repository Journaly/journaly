import React from 'react'

import { UserBadgeFragmentFragment as Badge, BadgeType } from '@/generated/graphql'
import { useTranslation } from 'next-i18next'
import theme from '@/theme'

type Props = {
  badge: Badge
}

const assertUnreachable = (x: never): never => {
  throw new Error(`Didn't expect to get here ${x}`)
}

const getBadgeCopySubpath = (badgeType: BadgeType): string => {
  switch (badgeType) {
    case BadgeType.AlphaUser:
      return 'badge.ALPHA_USER'
    case BadgeType.BetaUser:
      return 'badge.BETA_USER'
    case BadgeType.TenPosts:
      return 'badge.TEN_POSTS'
    case BadgeType.OnehundredPosts:
      return 'badge.ONEHUNDRED_POSTS'
    case BadgeType.CodeContributor:
      return 'badge.CODE_CONTRIBUTOR'
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
