import React from 'react'
import { createApi } from 'unsplash-js'
import { toast } from 'react-toastify'
import { InitiatePostImageUploadResponse } from '@/generated/graphql'
import SearchInput from '@/components/Dashboard/Filters/SearchInput'
import { useTranslation } from '@/config/i18n'

/**
 * PostEditor
 * -- ImageUploadModal
 * ---- UploadImage
 * ---- SearchUnsplash
 */

type SearchUnsplashProps = {
  onImageSelect: (image: InitiatePostImageUploadResponse) => void
}

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
type SearchResponse = Exclude<
  Awaited<ReturnType<ReturnType<typeof createApi>['search']['getPhotos']>>['response'],
  undefined
>['results']

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY as string,
})

const ImageComp: React.FC<{
  image: SearchResponse[number]
  onImageSelect: (image: InitiatePostImageUploadResponse) => void
}> = ({ image, onImageSelect }) => {
  const { user, urls, links } = image

  const handleImageClick = () => {
    const imageData = {
      uploadUrl: '',
      checkUrl: '',
      finalUrlLarge: `${urls.raw}&w=1200&fit=fill`,
      finalUrlSmall: `${urls.raw}&w=400&fit=fill`,
      unsplashPhotographer: user.username,
    }

    unsplashApi.photos.trackDownload({
      downloadLocation: links.download_location,
    })
    onImageSelect(imageData)
  }

  return (
    <>
      <div className="img-container">
        <img src={urls.small} onClick={handleImageClick} />
      </div>
      <a className="credit" target="_blank" href={`https://unsplash.com/@${user.username}`}>
        {user.name}
      </a>
      <style jsx>{`
        .img-container {
          height: 200px;
          border-radius: 3px;
          overflow: hidden;
        }

        img {
          position: relative;
          margin-bottom: 4px;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
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
  const { t } = useTranslation('common')
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
      toast.error(t('modal.unsplashError'))
      console.error('There was an error:', error)
    }
  }

  return (
    <div className="container">
      <SearchInput debounceTime={500} defaultValue="" onChange={onSearchChange} placeholder={t('ui.searchImagesPlaceholder')} />
      <div className="image-feed">
        <ul>
          {imageData?.map((image) => (
            <li key={image.id}>
              <ImageComp image={image} onImageSelect={onImageSelect} />
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
        }

        ul {
          width: 100%;
          list-style: none;
          padding: 8px;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          justify-content: space-around;
        }

        li {
          flex-grow: 1;
        }
      `}</style>
    </div>
  )
}

export default SearchUnsplash
