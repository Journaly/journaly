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
    { value: MembershipSubscriptionPeriod.Monthly, displayName: 'Monthly - £12' },
    { value: MembershipSubscriptionPeriod.Quarterly, displayName: '3 Months - £30' },
    { value: MembershipSubscriptionPeriod.Annualy, displayName: '1 Year - £100' },
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
