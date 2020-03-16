import { NextPage } from "next";
import LandingPageLayout from "../components/Layouts/LandingPageLayout";
import About from "../components/Site/About";

const AboutPage: NextPage = () => (
  <LandingPageLayout>
    <About />
  </LandingPageLayout>
);

export default AboutPage;
