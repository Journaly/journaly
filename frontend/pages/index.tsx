import { NextPage } from "next";
import LandingPageLayout from "../components/Layouts/LandingPageLayout";

const HomePage: NextPage = () => (
  <LandingPageLayout>
    <h1>Journaly is coming...</h1>
    <style jsx>{`
      h1 {
        margin: 50px auto;
        text-align: center;
      }
    `}</style>
  </LandingPageLayout>
);

export default HomePage;
