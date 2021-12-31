import React from 'react'
import { NextPage } from 'next'
import { withApollo } from '@/lib/apollo'
import SettingsPageLayout from '@/components/Layouts/SettingsPageLayout'
import AuthGate from '@/components/AuthGate'
import theme from '@/theme'

const Tutorials: NextPage = () => {
  return (
    <AuthGate>
      <>
        <SettingsPageLayout>
          <div className="forms-container">
            <div className="tutorials-container">
              <h1>Journaly Tutorials</h1>
              <div>
                <h2>01. A Tour of Your Dashboard</h2>
                <p>
                  Let's go on a tour of your new home for writing and connecting with a wonderful
                  community of like-minded language learners! This tutorial will give you a general
                  overview of the whole Journaly Dashboard.
                </p>
                <iframe
                  className="j-video"
                  width="560"
                  height="315"
                  src="https://www.youtube-nocookie.com/embed/6ewE7L2CHBk"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <hr />
              <div>
                <h2>02. Write A Post</h2>
                <p>
                  Let's write a post! This tutorial will show you the ins and outs of your beautiful
                  work space, your canvas: the Journaly Editor!
                </p>
                <iframe
                  className="j-video"
                  width="560"
                  height="315"
                  src="https://www.youtube-nocookie.com/embed/KdSCZp1TxN4"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <hr />
              <div>
                <h2>03. Correct A Post</h2>
                <p>
                  Let's look at how to give feedback and corrections on another Journaler's posts.
                </p>
                <iframe
                  className="j-video"
                  width="560"
                  height="315"
                  src="https://www.youtube-nocookie.com/embed/cEW29YmtJ30"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <hr />
              <div>
                <h2>04. Give Thanks For Feedback</h2>
                <p>
                  Now that you've gotten some feedback, let's take a look at how to give thanks to
                  users who have left you helpful comments. Every time you give thanks to a
                  Journaler, it effectively boosts their reputation for providing reliable feedback!
                </p>
                <iframe
                  className="j-video"
                  width="560"
                  height="315"
                  src="https://www.youtube-nocookie.com/embed/Apd0YztoYYw"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <hr />
              <div>
                <h2>05. Apply Corrections To Your Post</h2>
                <p>
                  Now let's take a look at the easiest way to take all that awesome feedback and
                  apply it to your post!
                </p>
                <iframe
                  className="j-video"
                  width="560"
                  height="315"
                  src="https://www.youtube-nocookie.com/embed/vxV-5562uf8"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <hr />
              <div>
                <h2>06. Leave General Comments</h2>
                <p>
                  In addition to leaving Inline Feedback on a given post, you may also simply want
                  to leave general feedback or discuss the post with the author and other readers.
                  Post Comments are perfect for this, and live at the bottom of each post!
                </p>
                <iframe
                  className="j-video"
                  width="560"
                  height="315"
                  src="https://www.youtube-nocookie.com/embed/N0qo90BvBiQ"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <hr />
              <div>
                <h2>07. Explore Your Notification Feed</h2>
                <p>
                  In order to make it as easy and intuitive as possible to stay up-to-date on your
                  Journaly community and all its activity, we built you a beautiful Notification
                  Feed! It's quite sophisticated and you'll soon come to love visiting it throughout
                  the day, but a walkthrough can be very helpful in getting to know all of its
                  features and how best to navigate it!
                </p>
                <iframe
                  className="j-video"
                  width="560"
                  height="315"
                  src="https://www.youtube-nocookie.com/embed/eLhbauVIA6E"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <hr />
              <div>
                <h2>08. Explore Your Daily Digest Email</h2>
                <p>
                  In addition to the Notification Feed, we also send out a Daily Digest email
                  whenever there has been activity on any of your posts, or other posts that you
                  have interacted with. Let's have a quick overview!
                </p>
                <iframe
                  className="j-video"
                  width="560"
                  height="315"
                  src="https://www.youtube-nocookie.com/embed/6WbkjKqpwiI"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <hr />
              <div>
                <h2>09. Earn Badges</h2>
                <p>
                  We believe in celebrating you and your accomplishments whenever we can, and that's
                  where Journaly Badges come in! Let's have a quick look at those, and how you can
                  earn them.
                </p>
                <iframe
                  className="j-video"
                  width="560"
                  height="315"
                  src="https://www.youtube-nocookie.com/embed/DVmX9RDvCLs"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <hr />
              <div>
                <h2>10. Fill Out Your Profile</h2>
                <p>
                  Let's have a look at how you can make your profile looking as nice and complete as
                  possible!
                </p>
                <iframe
                  className="j-video"
                  width="560"
                  height="315"
                  src="https://www.youtube-nocookie.com/embed/yTZYYZHSh6k"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <hr />
              <div>
                <h2>11. Clap For Fellow Journalers!</h2>
                <p>
                  Finally, let's see how you can support your fellow Journalers by clapping for the
                  posts they write!
                </p>
                <iframe
                  className="j-video"
                  width="560"
                  height="315"
                  src="https://www.youtube-nocookie.com/embed/limFXKC9BSQ"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </SettingsPageLayout>
        <style jsx>{`
          .forms-container {
            width: 100%;
            max-width: 1008px;
          }
          h1 {
            ${theme.typography.headingLG}
            text-align: center;
            margin-bottom: 20px;
          }
          h2 {
            font-weight: 600;
            margin-bottom: 12px;
          }
          .tutorials-container {
            width: 100%;
            padding: 25px;
            background-color: ${theme.colors.white};
            box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
          }

          .j-video {
            display: block;
            margin: 25px auto;
          }

          @media screen and (max-width: 750px) {
            .j-video {
              width: 320px;
              height: 180px;
            }
          }
        `}</style>
      </>
    </AuthGate>
  )
}

Tutorials.getInitialProps = async () => ({
  namespacesRequired: ['common', 'tutorials'],
})

export default withApollo(Tutorials)
