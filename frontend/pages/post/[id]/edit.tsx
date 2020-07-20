import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Node } from 'slate'
import { withApollo } from '../../../lib/apollo'
import { useTranslation } from '../../../config/i18n'

import DashboardLayout from '../../../components/Layouts/DashboardLayout'
import JournalyEditor from '../../../components/JournalyEditor'
import LanguageSelect from '../../../components/LanguageSelect'
import theme from '../../../theme'
import Button, { ButtonVariant } from '../../../elements/Button'
import {
  useEditPostQuery,
  useUpdatePostMutation,
} from '../../../generated/graphql'
import AuthGate from '../../../components/AuthGate'

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

const EditPostPage: NextPage = () => {
  const router = useRouter()
  const idStr = router.query.id as string
  const id = parseInt(idStr, 10)

  const { data: { currentUser, postById } = {} } = useEditPostQuery({ variables: { id } })
  const { languagesLearning = [], languagesNative = [] } = currentUser || {}

  const { t } = useTranslation('post')
  const [langId, setLangId] = React.useState<number>(-1)
  const [title, setTitle] = React.useState<string>('')
  const [body, setBody] = React.useState<Node[]>(initialValue)

  React.useEffect(() => {
    if (postById) {
      setTitle(postById.title)
      setLangId(postById.language.id)
      setBody(JSON.parse(postById.bodySrc) as Node[])
    }
  }, [postById])

  const [updatePost] = useUpdatePostMutation()

  const userLanguages = languagesLearning
    .map((x) => x.language)
    .concat(languagesNative.map((x) => x.language))

  const savePost = async () => {
    const { data } = await updatePost({
      variables: {
        languageId: langId,
        postId: id,
        title,
        body,
      },
    })

    if (!data || !data.updatePost) {
      return
    }

    router.push({ pathname: `/post/${data.updatePost.id}` })
  }

  return (
    <AuthGate>
      <DashboardLayout>
        <form id="edit-post">
          <h1>{t('editPost')}</h1>

          <label htmlFor="post-title">{t('titleLabel')}</label>
          <input
            className="j-field"
            id="post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            placeholder="The Greatest Story Never Told..."
            autoComplete="off"
          />

          <label htmlFor="post-language">{t('languageLabel')}</label>
          <LanguageSelect
            id="language"
            languages={userLanguages}
            value={langId}
            onChange={setLangId}
          />

          <div className="editor-padding">
            <JournalyEditor value={body} setValue={setBody} />
          </div>

          <div className="button-container">
            <Button
              type="submit"
              disabled={!title || langId === -1}
              variant={ButtonVariant.Primary}
              data-test="post-submit"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                savePost()
              }}
            >
              {t('save')}
            </Button>
          </div>
          <style jsx>{`
            display: flex;
            flex-direction: column;

            h1 {
              margin: 50px auto;
              text-align: center;
              ${theme.typography.headingXL};
            }

            .button-container {
              display: flex;
              flex-direction: row;
              margin: 0 auto;
              justify-content: space-between;
            }

            #new-post {
              display: flex;
              flex-direction: column;
              background-color: white;
              padding: 25px;
              box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
            }
            .editor-padding {
              padding: 25px 0;
            }
          `}</style>
        </form>
      </DashboardLayout>
    </AuthGate>
  )
}

EditPostPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'post'],
})

export default withApollo(EditPostPage)
