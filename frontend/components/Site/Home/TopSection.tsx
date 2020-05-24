import SignupForm from '../SignupForm'
import { width } from '../../../utils'

const TopSection = () => (
  <div className="home-section-top">
    <h1>Improve your language skills and connect with others through journaling.</h1>

    <SignupForm />

    <style jsx>{`
      .home-section-top {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 30px 20px;
        margin: 0 auto;
        max-width: ${width.desktopHD}px;
      }

      @media (min-width: 960px) {
        .home-section-top {
          flex-direction: row;
          align-items: center;
          padding: 90px 20px;
        }
      }

      .home-section-top h1 {
        margin-bottom: 30px;
        text-align: center;
      }

      @media (min-width: 960px) {
        .home-section-top h1 {
          margin-bottom: 0;
          margin-right: 64px;
          text-align: left;
        }
      }
      @media (min-width: 1040px) {
        .home-section-top h1 {
          margin-right: 136px;
        }
      }
    `}</style>
  </div>
)

export default TopSection
