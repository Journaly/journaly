import Nav from '../Site/Nav'

const LandingPageLayout: React.FC = ({ children }) => (
  <div>
    <Nav />

    {children}
  </div>
)

export default LandingPageLayout
