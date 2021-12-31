import React from 'react'
import { NextPage } from 'next'
import { withApollo } from '@/lib/apollo'
import SettingsPageLayout from '@/components/Layouts/SettingsPageLayout'
import AuthGate from '@/components/AuthGate'
import { useTranslation } from '@/config/i18n'
import theme from '@/theme'

const Tutorials: NextPage = () => {
  const { t } = useTranslation('tutorials')
  return (
    <AuthGate>
      <>
        <SettingsPageLayout>
          <div className="forms-container">
            <div className="tutorials-container">
              <h1>{t('pageTitle')}</h1>
              <div>
                <h2>A Tour of Your Dashboard</h2>
                <p>
                  Let's go on a tour of your new home for writing and connecting with a wonderful
                  community of like-minded language learners! This tutorial will give you a general
                  overview of the whole Journaly Dashboard.
                </p>
              </div>
              <hr />
              <div>
                <h2>Write A Post</h2>
                <p>
                  Let's write a post! This tutorial will show you the ins and outs of your beautiful
                  work space, your canvas: the Journaly Editor!
                </p>
              </div>
              <hr />
              <div>
                <h2>Correct A Post</h2>
                <p>
                  Let's look at how to give feedback and corrections on another Journaler's posts.
                </p>
              </div>
              <hr />
              <div>
                <h2>Give Thanks For Feedback</h2>
                <p>
                  Now that you've gotten some feedback, let's take a look at how to give thanks to
                  users who have left you helpful comments. Every time you give thanks to a
                  Journaler, it effectively boosts their reputation for providing reliable feedback!
                </p>
              </div>
              <hr />
              <div>
                <h2>Apply Corrections To Your Post</h2>
                <p>
                  Now let's take a look at the easiest way to take all that awesome feedback and
                  apply it to your post!
                </p>
              </div>
              <hr />
              <div>
                <h2>Leave General Comments</h2>
                <p>
                  In addition to leaving Inline Feedback on a given post, you may also simply want
                  to leave general feedback or discuss the post with the author and other readers.
                  Post Comments are perfect for this, and live at the bottom of each post!
                </p>
              </div>
              <hr />
              <div>
                <h2>Explore Your Notification Feed</h2>
                <p>
                  In order to make it as easy and intuitive as possible to stay up-to-date on your
                  Journaly community and all its activity, we built you a beautiful Notification
                  Feed! It's quite sophisticated and you'll soon come to love visiting it throughout
                  the day, but a walkthrough can be very helpful in getting to know all of its
                  features and how best to navigate it!
                </p>
              </div>
              <hr />
              <div>
                <h2>Explore Your Daily Digest Email</h2>
                <p>
                  In addition to the Notification Feed, we also send out a Daily Digest email
                  whenever there has been activity on any of your posts, or other posts that you
                  have interacted with. Let's have a quick overview!
                </p>
              </div>
              <hr />
              <div>
                <h2>Earn Badges</h2>
                <p>
                  We believe in celebrating you and your accomplishments whenever we can, and that's
                  where Journaly Badges come in! Let's have a quick look at those, and how you can
                  earn them.
                </p>
              </div>
              <hr />
              <div>
                <h2>Fill Out Your Profile</h2>
                <p>
                  Let's have a look at how you can make your profile looking as nice and complete as
                  possible!
                </p>
              </div>
              <hr />
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
          }
          .tutorials-container {
            width: 100%;
            padding: 25px;
            background-color: ${theme.colors.white};
            box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
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
