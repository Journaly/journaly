import theme from '@/theme'

const TermsOfService = () => {
  return (
    <div className="about-wrapper">
      <h1>Journaly Terms of Service</h1>
      <p>
        Journaly is home to helping people break down barriers and build meaningful connections
        through sharing parts of themselves: their journals and their languages.
      </p>
      <p>
        Our Community Guidelines exist to protect, promote, and guide our delightful and diverse
        community in achieving this, and they therefore apply to all content. As our community
        evolves, so too will our guidelines. Please be sure to pop by for another read in the
        future.
      </p>
      <p>
        By using Journaly, you agree to these Guidelines and our{' '}
        <a className="j-link" href="">
          Terms of Use
        </a>
        .
      </p>
      <ul>
        <li>
          Discrimination, Violence, Threats or Harm Safety and prosperity of our community members
          and the public is paramount. Journaly does not support or tolerate any behaviour of a
          discriminatory, violent, threatening and/or harmful nature. This includes, but is not
          limited to discriminatory or derogatory speech on the basis of: race, religion, gender,
          identity, orientation, age, disability, health, ancestry and/or class
        </li>
        <li>
          Identity, Privacy & Intellectual Property You are who you say you are, and respect the
          privacy of others. Please be sure you have consent and the right to share the property of
          others. We ask that you respect copyrights, trademarks, and other legal rights. This
          includes personal information such as a phone number, email address, profiles, physical
          addresses, credit card numbers, passwords, and/or any other similar personally
          identifiable information.
        </li>
        <li>
          Censorship & Legality Even when content is shared with good intentions, it may be used,
          appropriated or interpreted by others in unanticipated ways. It is important that content
          is kept appropriate for a diverse audience, and follows the laws.
        </li>
      </ul>

      <p>
        Breaches of our Guidelines may require us to respond in one or more of the following ways:
      </p>
      <ul>
        <li>Direct communication to resolve breach behaviour</li>
        <li>Removal of content</li>
        <li>Removal of privileges from, or adding restrictions to, accounts</li>
        <li>Temporary or permanent suspension of accounts</li>
      </ul>

      <p>
        If you believe a breach of our Guidelines or Terms of Use has occurred, please email us at
        hello@journaly.com for support.
      </p>

      <style jsx>{`
        .about-wrapper {
          max-width: 900px;
          margin: 50px auto 0;
          padding: 0 50px;
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

export default TermsOfService
