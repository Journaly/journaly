import { NextPage } from "next";
import JournalyEditor from "../../components/JournalyEditor";

const NewPostPage: NextPage = () => (
  <>
    <h1>Let's write a post</h1>
    <JournalyEditor />
    <style jsx>{`
      h1 {
        margin: 50px auto;
        text-align: center;
      }
    `}</style>
  </>
);

export default NewPostPage;
