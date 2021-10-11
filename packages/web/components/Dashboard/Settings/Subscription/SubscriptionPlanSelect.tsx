import React from 'react'
import {
  MembershipSubscriptionPeriod,
} from '@/generated/graphql'
import Select from '@/components/Select'
import { useTranslation } from '@/config/i18n'

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
  const subscriptionOptions = [
    { value: MembershipSubscriptionPeriod.Monthly, displayName: t('subscription.monthlyPrice') },
    { value: MembershipSubscriptionPeriod.Annualy, displayName: t('subscription.annualPrice') },
  ]
  if (isStudent) {
    subscriptionOptions.push({
      value: MembershipSubscriptionPeriod.StudentAnnually,
      displayName: t('subscription.studentPrice'),
    })
  }

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
