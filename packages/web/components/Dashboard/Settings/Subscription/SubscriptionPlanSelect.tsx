import React from 'react'
import {
  MembershipSubscriptionPeriod,
} from '@/generated/graphql'
import Select from '@/components/Select'
import { useTranslation } from '@/config/i18n'

type SubscriptionPlanSelectProps = {
  selectedOption: MembershipSubscriptionPeriod
  setSelectedOption: (arg1: MembershipSubscriptionPeriod) => void
}

const SubscriptionPlanSelect = ({ selectedOption, setSelectedOption}: SubscriptionPlanSelectProps) => {
  const { t } = useTranslation('settings')
  const subscriptionOptions = [
    { value: MembershipSubscriptionPeriod.Monthly, displayName: t('subscription.monthlyPrice') },
    { value: MembershipSubscriptionPeriod.Quarterly, displayName: t('subscription.quarterlyPrice') },
    { value: MembershipSubscriptionPeriod.Annualy, displayName: t('subscription.annualPrice') },
  ]

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
