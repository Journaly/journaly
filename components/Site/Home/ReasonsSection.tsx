import HomeSection from './HomeSection'
import { useTranslation } from '@/config/i18n'

type ReasonCardProps = {
  image: string
  reasonTexts: string[]
  reasonNumber: number
}

const imagePath = 'images/home'
const imageUrls = ['hand-writing.jpg', 'hands-typing.jpg', 'typewriter.jpg']

const ReasonsSection = () => {
  const { t } = useTranslation('common')
  const reasonTexts = [
    t('home.reasonOneText'),
    t('home.reasonTwoText'),
    t('home.reasonThreeText'),
  ]

  return (
    <HomeSection sectionHeading={t('home.reasonsHeader')} grey>
      <div className="reasons-container">
        {imageUrls.map((url, i) => (
          <ReasonCard key={i} image={`${imagePath}/${url}`} reasonTexts={reasonTexts} reasonNumber={i} />
        ))}
      </div>

      <style jsx>{`
        .reasons-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, auto));
          grid-gap: 30px;
          justify-content: space-evenly;
          counter-reset: reason;
        }
        @media (min-width: 1040px) {
          .reasons-container {
            padding: 0 30px;
          }
        }
      `}</style>
    </HomeSection>
  )
}

const ReasonCard: React.FC<ReasonCardProps> = ({ image, reasonTexts, reasonNumber }) => (
  <div className="reason-card">
    <img src={image} />

    <p>{reasonTexts[reasonNumber]}</p>

    <style jsx>{`
      img {
        width: 320px;
        height: 300px;
        border-radius: 5px;
        box-shadow: 0px 8px 10px #00000029;
        object-fit: cover;
      }

      p {
        position: relative;
        width: 320px;
        margin-top: 20px;
        text-indent: 40px;
        text-align: justify;
      }
      @media (min-width: 960px) {
        p {
          text-indent: 0;
          text-align: left;
        }
      }

      p::before {
        counter-increment: reason;
        content: '' counter(reason) '.';
        position: absolute;
        left: -35px;
        top: -10px;
        font-family: 'Playfair Display', serif;
        font-size: 40px;
      }
      @media (min-width: 960px) {
        p::before {
          top: 0;
        }
      }
    `}</style>
  </div>
)

export default ReasonsSection
