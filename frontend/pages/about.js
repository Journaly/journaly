import Link from "next/link";

import StandardLayout from "../components/layouts/StandardLayout";

const About = () => (
  <StandardLayout>
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
  </StandardLayout>
);

export default About;
