import theme from '@/theme'

const About = () => {
  return (
    <div className="about-wrapper">
      <h1>About Journaly</h1>
      <p>
        Journaly is a foreign language journaling platform that helps you improve your language
        skills through writing. It's about so much more than that, though!
      </p>
      <p>
        One of the best ways to improve your skills is to get feedback, so we make it as pleasant
        and simple as possible to give and receive valuable feedback from native speakers of the
        language you're learning.
      </p>
      <p>
        You should feel good about sharing your writing with fellow learners. We provide you with a
        seamless and delightful writing experience, enabling you to create visually pleasing posts
        that you are proud of.
      </p>
      <p>
        Journaling (and writing in general) is not an easy habit to build, so we also provide you
        with the tools and support you need to create healthful habits and build a great journaling
        practice that you can sustain.
      </p>
      <p>
        Finally, the most important part of Journaly is the community. We want to help people not
        only find language matches (people learning your native language who speak the language
        you're learning), but we also want to help you connect with people who share your interests.
        Our robust filters allow you to search for posts by language <em>and</em> topic. This will
        make it more enjoyable for you to read and provide feedback on their writing, but could also
        lead to wonderful language exchange partners and, hopefully, friends :)
      </p>
      <style jsx>{`
        .about-wrapper {
          max-width: 900px;
          margin: 50px auto 0;
          padding: 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: ${theme.colors.white};
          box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
        }

        h1 {
          margin-bottom: 20px;
          ${theme.typography.headingXL}
        }

        p {
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  )
}

export default About
