import { NextPage } from 'next'
import LandingPageLayout from '../components/Layouts/LandingPageLayout'
import Home from '../components/Site/Home'

const HomePage: NextPage = () => (
  <LandingPageLayout>
    <Home />
  </LandingPageLayout>
)

export default HomePage
