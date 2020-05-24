import { format } from 'date-fns'
import { getUTCDate } from '../../utils'

interface Props {
  date: string
  title: string
  image: string
  children: React.ReactNode
}

const BlogPageLayout: React.FC<Props> = (props) => (
  <div>
    <div className="header-container">
      <h1>{props.title}</h1>
      <div className="image-container">
        <img src={props.image} alt="" />
      </div>
    </div>
    <div className="blog-container">
      <p className="post-date">{format(getUTCDate(props.date), 'MMMM do, yyyy')}</p>
      <p className="post-separator">- -</p>
      <div className="post-container">{props.children}</div>
    </div>
    <style jsx>{`
      .header-container {
        position: relative;
      }

      .image-container {
        position: relative;
        overflow: hidden;
        width: 100vw;
        height: 350px;
        filter: brightness(0.3);
      }

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
      }

      h1 {
        position: absolute;
        text-align: center;
        color: white;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 64px;
        line-height: 1.2;
        z-index: 100;
      }

      .blog-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 25px 0 50px;
      }

      .post-date,
      .post-separator {
        font-size: 18px;
        text-align: center;
      }

      .post-date {
        font-style: italic;
      }

      .post-separator {
        margin-top: 10px;
      }

      .post-container {
        padding: 20px 50px;
      }
    `}</style>
  </div>
)

export default BlogPageLayout
