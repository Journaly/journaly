import FeatureComparisonTable from '@/components/FeatureComparisonTable'
import theme from '@/theme'

const Pricing = () => {
  return (
    <div className="pricing-wrapper">
      <h1>Journaly Pricing</h1>
      <p>
        Journaly is a foreign language journaling platform that helps you improve your language
        skills through writing. It's about so much more than that, though!
      </p>
      <FeatureComparisonTable />
      <style jsx>{`
        .pricing-wrapper {
          max-width: 900px;
          margin: 50px auto 0;
          padding: 0 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        h1 {
          margin-bottom: 20px;
          ${theme.typography.headingXL}
        }

        p {
          margin-bottom: 35px;
        }
      `}</style>
    </div>
  )
}

export default Pricing
