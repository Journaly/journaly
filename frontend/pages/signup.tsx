import { NextPage } from 'next'
import SignUpForm from '../components/SignUpForm'
import LandingPageLayout from '../components/Layouts/LandingPageLayout'

const SignUpPage: NextPage = props => (
  <LandingPageLayout>
    <SignUpForm />
    <style jsx>{`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      grid-gap: 20px;
    `}</style>
  </LandingPageLayout>
)
