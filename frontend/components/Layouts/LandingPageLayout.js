import Nav from "../Site/Nav";

// import Footer from '../Footer'

const LandingPageLayout = props => (
  <div>
    <Nav />
    {props.children}
    {/* <Footer /> */}
    <style jsx>{`
      max-width: 1200px;
      margin: 0px auto;
    `}</style>
  </div>
);

export default LandingPageLayout;
