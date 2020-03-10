import { NextPage } from 'next'
import TopSection from './TopSection'
import ReasonsSection from './ReasonsSection'
import VideoSection from './VideoSection'
import TestimonialsSection from './TestimonialsSection'

const HomePage: NextPage = () => {
  return (
    <div>
      <TopSection />
      <ReasonsSection />
      <VideoSection />
      <TestimonialsSection />
    </div>
  )
}

export default HomePage
