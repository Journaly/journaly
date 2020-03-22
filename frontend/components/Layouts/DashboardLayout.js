// import Header from '../Header'
// import Footer from '../Footer'

const DashboardLayout = (props) => (
  <div>
    {/* <Header /> */}
    {props.children}
    {/* <Footer /> */}
    <style jsx>{`
      max-width: 1200px;
      margin: 0px auto;
      padding: 0 2rem;
    `}</style>
  </div>
)

export default DashboardLayout
