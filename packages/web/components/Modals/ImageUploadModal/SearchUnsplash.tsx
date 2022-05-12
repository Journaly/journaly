import React, { useEffect } from 'react'
import { createApi } from 'unsplash-js'

import SearchInput from '@/components/Dashboard/Filters/SearchInput'
import Button from '@/components/Button'

type SearchUnsplashProps = {
  onImageSelect: (smallSizeUrl: string, largeSizeUrl: string) => void
}

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
type SearchResponse = Awaited<ReturnType<ReturnType<typeof createApi>['search']['getPhotos']>>

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

const ImageComp: React.FC<{ image: ImageType; onImageSelect: () => void }> = ({
  image,
  onImageSelect,
}) => {
  const { user, urls } = image

  return (
    <>
      <img src={urls.thumb} onClick={() => onImageSelect(urls.small, urls.regular)} />
      <a className="credit" target="_blank" href={`https://unsplash.com/@${user.username}`}>
        {user.name}
      </a>
      <style jsx>{`
        img {
          position: relative;
          margin-bottom: 4px;
          width: 100%;
          max-height: 300px;
          object-fit: cover;
        }
        img:hover {
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

const SearchUnsplash: React.FC<SearchUnsplashProps> = ({ onImageSelect }) => {
  const [imageData, setImageData] = React.useState<SearchResponse>()

  const onSearchChange = async (query: string) => {
    try {
      const images = await unsplashApi.search.getPhotos({
        query,
        orientation: 'landscape',
        page: 1,
        perPage: 25,
      })

      setImageData(images.response?.results)
    } catch (error) {
      console.log('There was an error:', error)
    }
  }

  return (
    <div>
      {/* TODO: Figure out adding a param for making the placeholder text more flexible */}
      <SearchInput debounceTime={500} defaultValue="" onChange={onSearchChange} />
      <div className="image-feed">
        <ul className="col">
          {imageData?.map((image: ImageType) => (
            <li key={image.id}>
              <ImageComp image={image} onImageSelect={onImageSelect} />
            </li>
          ))}
        </ul>
      </div>
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
