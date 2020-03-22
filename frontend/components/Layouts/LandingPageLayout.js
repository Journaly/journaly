import Nav from '../Site/Nav'

const LandingPageLayout = (props) => (
  <div>
    <Nav />

    {props.children}
  </div>
)

export default LandingPageLayout
