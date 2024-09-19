import React, { useMemo } from 'react'
import { MembershipSubscriptionPeriod } from '@/generated/graphql'
import Select from '@/components/Select'
import { useTranslation } from 'next-i18next'

type SubscriptionPlanSelectProps = {
  selectedOption: MembershipSubscriptionPeriod
  setSelectedOption: (arg1: MembershipSubscriptionPeriod) => void
  isStudent: boolean
}

const SubscriptionPlanSelect = ({
  selectedOption,
  setSelectedOption,
  isStudent,
}: SubscriptionPlanSelectProps) => {
  const { t } = useTranslation('settings')
  const subscriptionOptions = useMemo(() => {
    const options = [
      {
        value: MembershipSubscriptionPeriod.Monthly,
        displayName: t('subscription.monthlyPrice'),
      },
      {
        value: MembershipSubscriptionPeriod.Annualy,
        displayName: t('subscription.annualPrice'),
      },
    ]

    if (isStudent) {
      options.push({
        value: MembershipSubscriptionPeriod.StudentAnnually,
        displayName: t('subscription.studentPrice'),
      })
    }

    return options
  }, [isStudent])

  return (
    <Select
      flat
      onChange={setSelectedOption}
      options={subscriptionOptions}
      value={selectedOption}
      placeholder={t('subscription.planSelectPlaceholder')}
    />
  )
}

export default SubscriptionPlanSelect
