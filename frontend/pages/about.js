import LandingPageLayout from "../components/Layouts/LandingPageLayout";

const About = () => (
  <LandingPageLayout>
    <div className="container">
      <h1>About!</h1>
    </div>
    <style jsx>{`
      .container {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
      }
    `}</style>
  </LandingPageLayout>
);

export default About;
