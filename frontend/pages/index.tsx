import { NextPage } from "next"
import LandingPageLayout from "../components/Layouts/LandingPageLayout"
import SignupForm from '../components/SignupForm'
import Testimonials from '../components/Testimonials'
import { width, lightGrey } from '../utils'

const reasonTexts = [
  'Writing is such a powerful tool for improving your language skills, but it takes effort and is best when you can get feedback. Journaly is a home for your writing and great feedback from fellow language learners!',
  'There are many personal benefits to keeping a journal, and it is one of the most desired positive habits for many people. Journaly supercharges your language learning while helping you get all the benefits of keeping a journal!',
  'Many sites help you find a language exchange partner by simply matching your language interests - but that’s not good enough for us. Journaly helps you find people who also share the same interests as you!',
]

const ReasonCard = ({ image, reasonNumber }) => (
  <div className="reason-card">
    <img src={image} />
    <p>{reasonTexts[reasonNumber]}</p>
    <style jsx>{`
      .reason-card {
        display: flex;
      }

      img {
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
        p {
          top: 0;
        }
      }
    `}</style>
  </div>
)

const HomeSection = ({ sectionHeading, children, grey = false, style = {} }) => {
  return (
    <section className="home-section">
      <div>
        <h1>{sectionHeading}</h1>
        {children}
      </div>
      <style jsx>{`
        ${{...style}};
        width: 100%;
        ${grey && `background-color: ${lightGrey};`}
      
        div {
          margin: 0 auto;
          max-width: ${width.desktopHD}px;
          padding: 30px 20px;
        }
      
        h1 {
          margin-bottom: 50px;
          text-align: center;
        }
      
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
      
        .j-video {
          display: block;
          margin: 0 auto;
        }
        @media screen and (max-width: 750px) {
          .j-video {
            width: 320px;
            height: 180px;
          }
        }
      `}</style>
    </section>
  )
}

const HomePage: NextPage = () => {
  const data = ['', '', '']
  // fixed(width: 320, height: 300)
  return (
    <LandingPageLayout>
      <div className="home-styles">
        <div className="home-section-top">
          <h1>
            Improve your language skills and connect with others through
            journaling.
          </h1>

          <SignupForm />
        </div>
        <HomeSection
          sectionHeading="Three Reasons To Use Journaly"
          style={{ height: '400px' }}
          grey
        >
          <div className="reasons-container">
            {data.map((image, index) => (
              <ReasonCard
                key={index}
                image={image}
                reasonNumber={index}
              />
            ))}
          </div>
        </HomeSection>
        <HomeSection
          sectionHeading="A Delightful Writing Experience"
        >
          <iframe
            className="j-video"
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/QaOybEkd6XI"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          >
          </iframe>
        </HomeSection>
        <HomeSection
          sectionHeading="What Journalers are saying"
          grey
        >
          <Testimonials />
        </HomeSection>
      </div>
      <style jsx>{`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        @media screen and (min-width: 750px) {
          display: block;
        }
      
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
    </LandingPageLayout>
  )
}

export default HomePage
