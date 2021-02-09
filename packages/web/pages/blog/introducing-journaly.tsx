import { NextPage } from 'next'
import LandingPageLayout from '@/components/Layouts/LandingPageLayout'
import BlogPageLayout from '@/components/Layouts/BlogPageLayout'
import ExternalLink from '@/components/ExternalLink'
import { brandBlue } from '@/utils'
import { withApollo } from '@/lib/apollo'

const IntroducingJournalyBlogPost: NextPage = () => (
  <LandingPageLayout>
    <BlogPageLayout
      title="Introducing Journaly"
      date="2019-09-25"
      image={'../images/blog/post01-image.jpg'}
    >
      <p>
        Hi there! I'm Robin. Long-time language enthusiast,{' '}
        <ExternalLink href="https://youtube.com/user/TheLifeOfRob">polyglot YouTuber</ExternalLink>,
        language teacher, and author of the book{' '}
        <ExternalLink href="https://www.kumabrand.com/shop">
          <cite>How To Maintain Languages</cite>
        </ExternalLink>
        . I've spent the last 10 years learning languages and doing everything I can to find the
        most effective and innovative ways to help my students, viewers, and readers learn
        languages.
      </p>
      <p>
        Let me tell you why I spent the last (nearly) two years building Journaly for{' '}
        <strong>you</strong>.
      </p>
      <h2>The Amazing Language-Learning Activity of Writing</h2>
      <p>
        <em>Writing</em> is a wonderful activity for improving your foreign language skills. Many
        people don't realize that writing is particularly amazing for improving your{' '}
        <em>speaking skills</em>, as you learn and improve your ability to craft better sentences,
        expand your repertoire of vocabulary and sentence structures, and have ample time to both
        think about what you're saying and process feedback...
      </p>
      <p>
        Hang on. Let's pause and take a closer look at that word: <em>feedback</em>.
      </p>
      <h2>The Great Power and Challenge of Feedback</h2>

      <p>
        Getting good feedback on your language skills is incredibly helpful—even vital—to developing
        an excellent command of a foreign language. Getting it on a reliable and consistent basis is
        hard enough, but the greatest challenge of all is <em>capturing it</em>.
      </p>

      <p>
        When speaking with people, the reality is unfortunately that much of the wonderful feedback
        we get goes right over our heads. I've gone to great lengths out in the field to capture as
        much of it as I could. In Japan, I always carried around a little field notebook. I also
        developed a system of having separate folders in my Japanese dictionary app for each person
        that I spoke with regularly, so that I could bundle my learnings into more speciifc contexts
        (a very useful technique!). But even after I'd worked as a Japanese-English interpreter and
        then worked as a Japanese barista while enrolled in a Japanese university in all Japanese
        classes, I would still find myself getting tons of amazing feedback from native speakers
        around me and <strong>I just could not capture it all</strong>.
      </p>

      <p>
        Engaging in conversations also requires quite a high language level, and being able to take
        valuable notes while maintaining the flow of conversation is tricky even for advanced
        speakers. "Oh! What was that great word you used in the first part of that fascinating
        discussion point!?", doesn't exactly inspire an unsuspecting interlocuter who's just trying
        to have a great chat.
      </p>

      <p>
        Now, after learning to speak eight languages to varying degrees of fluency (several to
        highly advanced levels) with my ninth well on its way, I simply can't bear to imagine all of
        the words, phrases, idioms, and wonderful little turns of phrase that have slipped through
        the cracks. It pains me to think of all those wonderful tips I scribbled down on napkins
        that were whisked away by a puzzled waiter, or on the backs of receipts that had to be sent
        off to the accountant. I needed to create a better, more reliable system for not only{' '}
        <em>capturing</em> but also <em>organizing</em> and <em>storing</em> feedback.
      </p>

      <h2>Writing Takes Effort. Let's Make It Delightful.</h2>

      <p>
        The thing about writing is that it's an effortful activity and a lot of us struggle to know
        what to write about. It's hard enough to write in a foreign language without the stress of
        having to come up with a New York Times Best Seller.
      </p>

      <p>
        Well, that's where journaling, language learning, and technology all married so beautifully
        into the idea that became{' '}
        <strong>
          <em>Journaly</em>
        </strong>
        .
      </p>

      <p>
        In Chapter 5 of <ExternalLink href="https://www.kumabrand.com/shop">my book</ExternalLink>,
        I discuss at length the technique of keeping a journal in the target language to drastically
        improve speaking accuracy through writing. This tends to be an easier activity to engage in,
        because most people are already familiar with the concept of journaling. Furthermore, it's
        actually something that <strong>a lot</strong> of people would love to do <em>anyway</em>,
        but building and maintaining that positive habit isn't easy.
      </p>

      <p>
        Let's imagine a foreign language journaling platform. One that provided a seamless and
        delightful writing experience, enabling you to create visually pleasing posts that you were
        proud of, giving you the tools and support to build a healthful journaling practice. What if
        it made it easy to exchange feedback with native speakers and fellow learners? What if you
        could even make friends with like-minded people along the way (these could become ideal
        language exchange partners!), as well as having a reliable system to store and organize all
        of that invaluable feedback and your posts.
      </p>

      <h2>Hello, Journaly.</h2>

      <p>
        Journaly is that platform, and I believe it's going to change the world and community
        dynamic of language learning.
      </p>

      <p>
        I want to make the writing experience easy and enjoyable, so that you <em>want</em> to
        write. That's why we spent months and months engaging in a robust design process, crafting
        and revising the designs to make sure it's lightning fast and intuitive to use.
      </p>

      <p>
        It will be a home for you to build strong and healthful journaling habits that you can stick
        to and feel great about. One of the reasons that getting feedback on your writing is hard is
        that <em>giving feedback</em> also takes a lot of effort, so we're striving to build the
        most intuitive and pleasant "inline feedback experience" of any app.
      </p>

      <p>
        This will allow you to simply highlight any text in someone's post and provide feedback
        directly inline. This means you can write your feedback exactly where it belongs, and the
        user can see it right there, too. The author and other readers will see highlights where
        there are comments, and you'll be able to respond to discuss this feedback in little
        "feedback threads" off to the side of the post.
      </p>

      <p>
        We've also put together a full roadmap of additional features that we <em>can't wait</em> to
        share with you.
      </p>

      <h2>How is Journaly different from Lang-8?</h2>

      <p>
        If you've been in the online language learning space for a while, you may have heard of a
        website called Lang-8, which was very popular in the past and allowed you to get written
        corrections. Some have asked us how Journaly is different.
      </p>

      <p>
        Lang-8 was very useful, but the design was incredibly outdated and they closed off the
        ability for new users to sign up years ago. There's been a great need in the community that
        we aim to address, but Journaly is so much more than a Lang-8 replacement. Lang-8 was
        transactional, whereas Journaly has been designed from the first moment through the lenses
        of <em>User Experience</em> and{' '}
        <em>
          habit-forming <strong>product design</strong>
        </em>{' '}
        to help you not just write often, but also to help you build <em>meaningful connections</em>{' '}
        in the community with fellow learners who share your interests.
      </p>

      <p>
        You'll be able to find not just perfect <em>language matches</em>, but also perfect{' '}
        <strong>
          <em>people matches</em>
        </strong>
        . Let's say you're an English speaker who's learning French. You like rock climbing, food,
        and movies. You'll be able to use our robust filters to find French speakers who are
        learning English, and who write about one or maybe even <strong>all</strong> of your
        interests!
      </p>

      <p>
        This is why Journaly is about so much more than just writing and even improving your
        language skills. It's about helping people around the world break down linguistic and
        cultural barriers and meet wonderful people who they'd love to be friends with, and enabling
        them to also help each other immeasurably by simply exchanging the gift of their native
        languages.
      </p>

      <p>
        Journaly has been created by seasoned language learners who are also deeply passionate about
        software design and engineering. We're committed to putting all of our skills, experience,
        and passion into building the absolute best and most helpful experience for each and every
        one of you.
      </p>

      <h2>Wait, there's more!?</h2>

      <p>Yep! I've barely scratched the surface of the amazing things we have in store for you:</p>

      <ul>
        <li>
          You'll have your own dashboard with a personalized feed of public posts from fellow
          learners who write about things you're interested in and in the language(s) you speak or
          are learning.
        </li>
        <li>
          You'll be able to see your statistics: how many posts you've written, your "day streak",
          and how many posts you've provided feedback on.
        </li>
        <li>
          In the future, we even plan to allow you to have language exchanges with your new friends
          right here inside the platform.
        </li>
        <li>Much, much more.</li>
      </ul>

      <p>I hope this gives you an exciting introduction to Journaly!</p>

      <style jsx>{`
        h2 {
          margin-top: 35px;
          font-weight: 700;
        }

        p,
        p :global(a),
        ul {
          font-size: 18px;
        }

        p {
          margin-top: 16px;
        }

        p:first-child {
          margin-top: 0;
        }

        a {
          color: ${brandBlue};
        }

        ul {
          margin-top: 16px;
          padding-left: 30px;
          list-style: disc outside;
        }
      `}</style>
    </BlogPageLayout>
  </LandingPageLayout>
)

IntroducingJournalyBlogPost.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withApollo(IntroducingJournalyBlogPost)
