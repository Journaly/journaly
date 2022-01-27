import theme from '@/theme'

const TermsOfService = () => {
  return (
    <div className="wrapper">
      <h1>Journaly Terms of Service</h1>
      <h2>General Background</h2>
      <p>
        Journaly is a warm, supportive, and positive community that, at its core, is for helping
        people break down barriers and build meaningful connections through sharing parts of
        themselves: their journals and their languages.
      </p>
      <p>
        Our Community Guidelines exist to protect, promote, and guide our delightful and diverse
        community in achieving this and they therefore apply to all content that is posted on the
        platform. Please know that our intent is never to censor people's views or speech – any
        decisions we make here are solely aimed to try our best to uphold the community values and
        maintain a safe, positive environment.
      </p>
      <p>
        As we continue always learning how to guide this community, and as the community itself
        evolves, so too will our guidelines. We'll be sure to always notify via email when updates
        are made to this living document.
      </p>
      <h2>The Guidelines</h2>
      <p>By using Journaly, you agree to the following Guidelines and Terms of Use.</p>
      <ul>
        <li>
          <strong>Discrimination, Violence, Threats or Harm:</strong> The safety and prosperity of
          our community members and the public is paramount. Journaly does not support or tolerate
          any behaviour of a discriminatory, violent, threatening and/or harmful nature. This
          includes, but is not limited to, discriminatory or derogatory speech on the basis of:
          race, religion, gender, identity, orientation, age, disability, health, ancestry and/or
          class
        </li>
        <li>
          <strong>Identity, Privacy & Intellectual Property:</strong> You are who you say you are,
          and respect the privacy of others. Please be sure you have consent and the right to share
          the property of others. We ask that you respect copyrights, trademarks, and other legal
          rights. This includes personal information such as a phone number, email address,
          profiles, physical addresses, credit card numbers, passwords, and/or any other similar
          personally identifiable information.
        </li>
        <li>
          <strong>Censorship & Legality:</strong> Even when content is shared with good intentions,
          it may be used, appropriated or interpreted by others in unanticipated ways. It is
          important that content is kept appropriate for a diverse audience, and follows general
          laws.
        </li>
        <li>
          <strong>Advertising:</strong> We do not allow content that is solely for the purposes of
          advertising. If you have your own brand, content, or product, and you want to write
          genuinely substantive content on Journaly that is clearly aimed at benefiting the
          community, and use that as a way to promote whatever it may be, that's no problem. But
          content that is clearly for the sole purpose of advertising and especially that which
          solely consists of an advertisement is a breach of these guidelines and will be removed
          immediately. Repeat occurences will lead to the removal of the account.
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
        If you believe a breach of our Guidelines or Terms of Use has occurred, please email us at{' '}
        <a href="mailto:hello@journaly.com" className="j-link">
          hello@journaly.com
        </a>{' '}
        for support.
      </p>

      <h2>Thank You All</h2>

      <p>
        Thank you to each and every one of you all for being an amazing part of this wonderful,
        safe, warm, supportive, and positive community and helping us to keep it that way. We really
        can't do it without you ❤️
      </p>

      <style jsx>{`
        .wrapper {
          max-width: 900px;
          margin: 50px auto 0;
          padding: 50px;
          background-color: ${theme.colors.white};
        }

        h1 {
          margin-bottom: 20px;
          text-align: center;
          ${theme.typography.headingXL}
        }

        h2 {
          margin-bottom: 12px;
          ${theme.typography.headingMD}
        }

        p {
          margin-bottom: 15px;
        }

        ul {
          list-style: inside;
        }
      `}</style>
    </div>
  )
}

export default TermsOfService
