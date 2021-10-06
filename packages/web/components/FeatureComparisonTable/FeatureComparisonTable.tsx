import theme from '@/theme'
import React from 'react'
import CheckmarkCircleIcon from '../Icons/CheckmarkCircleIcon'

type FeatureProps = {
  name: string
  plan: string
}

const Feature = ({ name, plan }: FeatureProps) => {
  const color = plan === 'premium' ? 'white' : 'blue'
  return (
    <li>
      <CheckmarkCircleIcon color={color} />
      <span>{name}</span>
      <style jsx>{`
        display: flex;
        align-items: center;

        span {
          margin-left: 10px;
        }
      `}</style>
    </li>
  )
}

const FeatureComparisonTable = () => {
  return (
    <div className="container">
      <div className="col free">
        <div className="header">
          <div className="plan">Free</div>
        </div>
        <div className="feature-list">
          <ul>
            <Feature name="Write in unlimited languages" plan="free" />
            <Feature name="Write unlimited posts" plan="free" />
            <Feature name="Get unlimited feedback" plan="free" />
            <Feature name="Custom post headers" plan="free" />
            <Feature name="Advanced post filtering" plan="free" />
            <Feature name="Direct Messaging (coming soon)" plan="free" />
            <Feature name="User Groups (coming soon)" plan="free" />
          </ul>
        </div>
      </div>
      <div className="col premium">
        <div className="header">
          <div className="plan">Premium</div>
          <div className="price">£5/month</div>
          <div className="price">£42/year (£3.50/month)</div>
        </div>
        <div className="feature-list">
          <ul>
            <Feature name="Inline images inside posts" plan="premium" />
            <Feature name="Bump posts to top of the feed" plan="premium" />
            <Feature name="Writing prompts (coming soon)" plan="premium" />
            <Feature name="Focus Mode (coming soon)" plan="premium" />
            <Feature name="Post Themes (coming soon)" plan="premium" />
            <Feature name="Audio posts (coming soon)" plan="premium" />
          </ul>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
        }
        .col {
          width: 300px;
          border-radius: 8px;
          padding: 25px;
        }
        .free {
          background: ${theme.colors.white};
          box-shadow: 0 7px 30px rgba(0, 0, 0, 0.05);
        }

        .premium {
          background: ${theme.colors.blueLight};
          color: ${theme.colors.white};
          box-shadow: 0 7px 30px rgba(52, 13, 135, 0.3);
          margin: -10px;
        }
        .header {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-bottom: 10px;
          margin-bottom: 15px;
        }

        .plan {
          font-size: 24px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .free .header {
          padding: 24px;
          border-bottom: 1px ${theme.colors.charcoal} solid;
        }
        .premium .header {
          border-bottom: 1px ${theme.colors.white} solid;
        }
      `}</style>
    </div>
  )
}

export default FeatureComparisonTable
