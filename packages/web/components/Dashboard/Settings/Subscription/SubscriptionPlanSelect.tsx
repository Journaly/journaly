import React from 'react'
import {
  MembershipSubscriptionPeriod,
} from '@/generated/graphql'
import Select from '@/components/Select'

type SubscriptionPlanSelectProps = {
  selectedOption: MembershipSubscriptionPeriod
  setSelectedOption: (arg1: MembershipSubscriptionPeriod) => void
}

const SubscriptionPlanSelect = ({ selectedOption, setSelectedOption}: SubscriptionPlanSelectProps) => {
  const subscriptionOptions = [
    { value: MembershipSubscriptionPeriod.Monthly, displayName: 'Monthly - £12' },
    { value: MembershipSubscriptionPeriod.Quarterly, displayName: '3 Months - £30' },
    { value: MembershipSubscriptionPeriod.Annualy, displayName: '1 Year - £100' },
  ]

  return (
    <Select
      onChange={(value) => {setSelectedOption(value)}}
      options={subscriptionOptions}
      value={selectedOption}
      placeholder="Which subscription would you like?"
    />
  )
}

export default SubscriptionPlanSelect
