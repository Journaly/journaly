import React from 'react'
import { createApi } from 'unsplash-js'

import SearchInput from '@/components/Dashboard/Filters/SearchInput'
import Button from '@/components/Button'

type SearchUnsplashProps = {
  onCancel: () => void
  onUnsplashSelect: (smallUrl: string, largeUrl: string) => void
  show: boolean
}

type ImageType = {
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

const ImageComp: React.FC<{ image: ImageType; onImageSelect: any }> = ({
  image,
  onImageSelect,
}) => {
  const { user, urls } = image

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

const SearchUnsplash = () => {
  const [data, setPhotosResponse] = React.useState<any>()

  const onSearchChange = (query: string) => {
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
    <div>
      <h3>Find an image on Unsplash</h3>
      <SearchInput debounceTime={500} defaultValue="" onChange={onSearchChange} />
      <div className="image-feed">
        <ul className="col">
          {data?.map((image: ImageType) => (
            <li key={image.id}>
              <ImageComp image={image} onImageSelect={onImageSelect} />
            </li>
          ))}
        </ul>
      </div>
      <Button>Choose Image</Button>
      <style jsx>{`
        .col {
          width: 100%;
          list-style: none;
          padding: 8px;
          margin: 0;
          display: flex;
          flex-direction: column;
        }
        li {
          margin-bottom: 12px;
        }
      `}</style>
    </div>
  )
}

export default SearchUnsplash
