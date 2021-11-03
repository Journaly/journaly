import React from 'react'
import { createApi } from 'unsplash-js'

import { useTranslation } from '@/config/i18n'
import Button, { ButtonVariant } from '@/components/Button'
import Modal from '@/components/Modal'
import SearchInput from '@/components/Dashboard/Filters/SearchInput'

type Props = {
  onConfirm: () => void
  onCancel: () => void
  show: boolean
}

type Photo = {
  id: number
  width: number
  height: number
  urls: { large: string; regular: string; raw: string; small: string; thumb: string }
  color: string | null
  user: {
    username: string
    name: string
  }
}

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY as string,
})

const PhotoComp: React.FC<{ photo: Photo }> = ({ photo }) => {
  const { user, urls } = photo

  return (
    <>
      <img className="img" src={urls.thumb} />
      <a className="credit" target="_blank" href={`https://unsplash.com/@${user.username}`}>
        {user.name}
      </a>
      <style jsx>{`
        .img {
          position: relative;
          margin-bottom: 4px;
          width: 100%;
          max-height: 300px;
          object-fit: cover;
        }

        .credit {
          font-size: 12px;
          line-height: 15px;
          text-decoration-line: underline;
          color: #b3b3b3;
        }
      `}</style>
    </>
  )
}

function UnsplashSearch() {
  const [data, setPhotosResponse] = React.useState<any>()

  function onSearchChange(query: string) {
    unsplashApi.search
      .getPhotos({ query, orientation: 'landscape' })
      .then((result) => {
        setPhotosResponse(result.response?.results)
      })
      .catch(() => {
        console.log('something went wrong!')
      })
  }

  return (
    <>
      <SearchInput debounceTime={500} defaultValue="test" onChange={onSearchChange} />
      <div className="feed">
        <ul className="columnUl">
          {data?.map((photo: Photo) => (
            <li key={photo.id} className="li">
              <PhotoComp photo={photo} />
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .columnUl {
          width: 100%;
          list-style: none;
          padding: 8px;
          margin: 0;

          display: flex;
          flex-direction: column;
        }

        .li {
          margin-bottom: 12px;
        }
      `}</style>
    </>
  )
}

const UnsplashModal: React.FC<Props> = (props) => {
  const { t } = useTranslation('common')

  return props.show ? (
    <>
      <Modal
        title="Choose your image"
        body={<UnsplashSearch />}
        footer={
          <>
            <Button variant={ButtonVariant.Primary} onClick={props.onConfirm}>
              {t('modal.confirm')}
            </Button>
            <Button variant={ButtonVariant.Secondary} onClick={props.onCancel}>
              {t('modal.cancel')}
            </Button>
          </>
        }
        onClose={props.onCancel}
      />
    </>
  ) : null
}

export default UnsplashModal
