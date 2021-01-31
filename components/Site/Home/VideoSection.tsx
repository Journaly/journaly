import { useTranslation } from '@/config/i18n'
import HomeSection from './HomeSection'

const VideoSection = () => {
  const { t } = useTranslation('common')
  return (
    <HomeSection sectionHeading={t('home.videoHeader')}>
      <iframe
        className="j-video"
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/5A7gkFULxTo"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <style jsx>{`
        .j-video {
          display: block;
          margin: 0 auto;
        }

        @media screen and (max-width: 750px) {
          .j-video {
            width: 320px;
            height: 180px;
          }
        }
      `}</style>
    </HomeSection>
  )
}

export default VideoSection
