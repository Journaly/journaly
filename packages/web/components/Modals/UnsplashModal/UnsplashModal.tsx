import React from 'react'
import { createApi } from 'unsplash-js'

import Modal from '@/components/Modal'
import SearchInput from '@/components/Dashboard/Filters/SearchInput'

type Props = {
  onCancel: () => void
  onUnsplashSelect: (smallUrl: string, largeUrl: string) => void
  show: boolean
}

type Photo = {
  id: number
  width: number
  height: number
  urls: { full: string; regular: string; raw: string; small: string; thumb: string }
  color: string | null
  user: {
    username: string
    name: string
  }
}

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY as string,
})

const PhotoComp: React.FC<{ photo: Photo; onImageSelect: any }> = ({ photo, onImageSelect }) => {
  const { user, urls } = photo

  return (
    <>
      <img
        className="img"
        src={urls.thumb}
        onClick={() => onImageSelect(urls.small, urls.regular)}
      />
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

        .img:hover {
          cursor: pointer;
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

const UnsplashSearch: React.FC<{ onImageSelect: any }> = ({ onImageSelect }) => {
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
      <SearchInput debounceTime={500} defaultValue="" onChange={onSearchChange} />
      <div className="feed">
        <ul className="columnUl">
          {data?.map((photo: Photo) => (
            <li key={photo.id} className="li">
              <PhotoComp photo={photo} onImageSelect={onImageSelect} />
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
  return props.show ? (
    <>
      <Modal
        title="Search Unsplash"
        body={<UnsplashSearch onImageSelect={props.onUnsplashSelect} />}
        onClose={props.onCancel}
      />
    </>
  ) : null
}

export default UnsplashModal
