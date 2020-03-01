import { NextPage } from "next";
// import BlogPostLayout from "../components/Layouts/BlogPostLayout";

const HomePage: NextPage = () => (
  // <LandingPageLayout>
  <>
    <h1>The Post</h1>
    <style jsx>{`
      h1 {
        margin: 50px auto;
        text-align: center;
      }
    `}</style>
  </>
  // </LandingPageLayout>
);

export default HomePage;
